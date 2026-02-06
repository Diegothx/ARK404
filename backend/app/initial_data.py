# app/initial_data.py
import os
from sqlalchemy.orm import Session
from app.db.models.users import User
from app.utils.security import hash_password
from app.db.session import SessionLocal

def create_admin():
    """
    Creates an admin user manually.
    Requires environment variables: ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD.
    """
    db: Session = SessionLocal()
    try: 
        admin_username = os.getenv("ADMIN_USERNAME")
        admin_email = os.getenv("ADMIN_EMAIL")
        admin_password = os.getenv("ADMIN_PASSWORD")

        if not all([admin_username, admin_email, admin_password]):
            raise ValueError(
                "ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD environment variables must be set!"
            )

        # Check if user already exists
        existing_admin = db.query(User).filter(User.username == admin_username).first()
        if existing_admin:
            print(f"User already exists: {existing_admin.username}")
            return

        print("Creating admin user...")
        # Create admin
        new_admin = User(
            username=admin_username,
            email=admin_email,
            password=hash_password(admin_password),
            role="admin"
        )
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)
        print(f"Admin user created successfully: {new_admin.username}")
    finally:
        db.close()
