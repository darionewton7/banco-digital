from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False) # Added password hash
    accounts = db.relationship("Account", backref="user", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
            # Do not include password_hash in dict representation
        }

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    account_number = db.Column(db.String(20), unique=True, nullable=False)
    balance = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    transactions = db.relationship('Transaction', backref='account', lazy=True)

    def __repr__(self):
        return f'<Account {self.account_number}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'account_number': self.account_number,
            'balance': str(self.balance), # Convert Decimal to string for JSON serialization
            'created_at': self.created_at.isoformat()
        }

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False) # e.g., 'deposit', 'withdrawal', 'transfer_in', 'transfer_out'
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    related_account_number = db.Column(db.String(20), nullable=True) # For transfers

    def __repr__(self):
        return f'<Transaction {self.id} - {self.type} - {self.amount}>'

    def to_dict(self):
        return {
            'id': self.id,
            'account_id': self.account_id,
            'type': self.type,
            'amount': str(self.amount),
            'description': self.description,
            'timestamp': self.timestamp.isoformat(),
            'related_account_number': self.related_account_number
        }

