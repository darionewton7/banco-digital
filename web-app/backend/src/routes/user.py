from flask import Blueprint, jsonify, request, session
from src.models.user import User, Account, db # Import Account model
import datetime

user_bp = Blueprint("user", __name__)

@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.json
    if not data or not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Username, email, and password are required"}), 400

    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "Username already exists"}), 409
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(username=data["username"], email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.flush() # Flush to get user ID before creating account

    # Create a default account for the new user
    # Generate a simple unique account number (improve this in a real app)
    account_number = f"ACC{user.id:08d}"
    account = Account(user_id=user.id, account_number=account_number, balance=1000.00) # Start with some balance for testing
    db.session.add(account)

    db.session.commit()
    return jsonify(user.to_dict()), 201

@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.json
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if user is None or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Use session to store user id (simple session management)
    session["user_id"] = user.id
    return jsonify({"message": "Login successful", "user": user.to_dict()}), 200

@user_bp.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id", None)
    return jsonify({"message": "Logout successful"}), 200

@user_bp.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.get(user_id)
    if not user:
         session.pop("user_id", None) # Clean up invalid session
         return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict()), 200

# Keep GET /users for admin purposes maybe, but protect it
@user_bp.route("/users", methods=["GET"])
def get_users():
    # Add authentication/authorization check here in a real app
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

# Other user routes (GET by ID, PUT, DELETE) might need auth checks too
@user_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    # Add auth check
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@user_bp.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    # Add auth check - only user themselves or admin should update
    user = User.query.get_or_404(user_id)
    data = request.json
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    if "password" in data:
        user.set_password(data["password"])
    db.session.commit()
    return jsonify(user.to_dict())

@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    # Add auth check - only admin should delete?
    user = User.query.get_or_404(user_id)
    # Consider deleting related accounts/transactions or handling constraints
    db.session.delete(user)
    db.session.commit()
    return "", 204

