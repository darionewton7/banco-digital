from flask import Blueprint, jsonify, request, session
from src.models.user import User, Account, Transaction, db
from decimal import Decimal

transaction_bp = Blueprint("transaction", __name__)

@transaction_bp.route("/accounts/<int:account_id>/transactions", methods=["GET"])
def get_transactions(account_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # Ensure the account belongs to the logged-in user
    account = Account.query.filter_by(id=account_id, user_id=user_id).first_or_404()

    # Query transactions ordered by timestamp descending
    transactions = Transaction.query.filter_by(account_id=account_id).order_by(Transaction.timestamp.desc()).all()
    
    return jsonify([t.to_dict() for t in transactions]), 200

@transaction_bp.route("/accounts/<int:source_account_id>/transfer", methods=["POST"])
def create_transfer(source_account_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    if not data or not data.get("destination_account_number") or not data.get("amount"):
        return jsonify({"error": "Destination account number and amount are required"}), 400

    try:
        amount_to_transfer = Decimal(data["amount"])
        if amount_to_transfer <= 0:
            raise ValueError("Amount must be positive")
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid amount format"}), 400

    description = data.get("description", "")
    destination_account_number = data["destination_account_number"]

    # Ensure the source account belongs to the logged-in user
    source_account = Account.query.filter_by(id=source_account_id, user_id=user_id).first()
    if not source_account:
        return jsonify({"error": "Source account not found or access denied"}), 404

    # Find the destination account
    destination_account = Account.query.filter_by(account_number=destination_account_number).first()
    if not destination_account:
        return jsonify({"error": "Destination account not found"}), 404

    # Check for sufficient balance
    if source_account.balance < amount_to_transfer:
        return jsonify({"error": "Insufficient balance"}), 400
    
    # Prevent transferring to the same account
    if source_account.id == destination_account.id:
        return jsonify({"error": "Cannot transfer to the same account"}), 400

    try:
        # Perform the transfer atomically
        source_account.balance -= amount_to_transfer
        destination_account.balance += amount_to_transfer

        # Create transaction records
        debit_transaction = Transaction(
            account_id=source_account.id,
            type="transfer_out",
            amount=-amount_to_transfer, # Store as negative for outgoing
            description=f"Transfer to {destination_account_number}: {description}",
            related_account_number=destination_account_number
        )
        credit_transaction = Transaction(
            account_id=destination_account.id,
            type="transfer_in",
            amount=amount_to_transfer,
            description=f"Transfer from {source_account.account_number}: {description}",
            related_account_number=source_account.account_number
        )

        db.session.add(debit_transaction)
        db.session.add(credit_transaction)
        db.session.commit()

        return jsonify({"message": "Transfer successful"}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error during transfer: {e}") # Log the error
        return jsonify({"error": "Transfer failed. Please try again later."}), 500

