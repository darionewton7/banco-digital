import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from src.models.user import db
from src.routes.user import user_bp
from src.routes.account import account_bp # Import account blueprint
from src.routes.transaction import transaction_bp # Import transaction blueprint

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT' # Use a more secure key in production, maybe from env var

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(account_bp, url_prefix='/api') # Register account blueprint
app.register_blueprint(transaction_bp, url_prefix='/api') # Register transaction blueprint

# Database configuration (using SQLite)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db" # Use SQLite
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
with app.app_context():
    db.create_all() # Create tables if they don't exist

# Serve static files (for frontend build later, or basic index.html)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        # Serve index.html for SPA routing
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            # If no index.html, maybe return API status or error
            # For now, keep the original behavior
            return "index.html not found", 404


if __name__ == '__main__':
    # Consider using Waitress or Gunicorn for production
    app.run(host='0.0.0.0', port=5000, debug=True) # Use port 5000 for backend API

