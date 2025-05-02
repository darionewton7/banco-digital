from flask import Blueprint, jsonify, request, session
from src.models.user import User, Account, db

account_bp = Blueprint("account", __name__)

# Placeholder for account-related routes
@account_bp.route("/accounts", methods=["GET"])
def get_my_accounts():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    accounts = Account.query.filter_by(user_id=user_id).all()
    return jsonify([acc.to_dict() for acc in accounts]), 200

@account_bp.route("/accounts/<int:account_id>/balance", methods=["GET"])
def get_account_balance(account_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    account = Account.query.filter_by(id=account_id, user_id=user_id).first_or_404()
    return jsonify({"balance": str(account.balance)}), 200

# Add more routes as needed (e.g., get account details)

