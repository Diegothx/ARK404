from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session 
from app.db.models import User  # your user model
from app.db.session import get_db
from app.utils.security import verify_password, create_access_token
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(tags=["Admin"])

@router.post("/admin/login")
def admin_login(username_or_email: str, password: str, db: Session = Depends(get_db)): 
    try:
        # Find user by username or email
        user = db.query(User).filter(
            (User.username == username_or_email) | (User.email == username_or_email)
        ).first()
        print(f"Attempting login for user: {username_or_email}")
        print(user)
        if not user or not verify_password(password, user.password):
            print("Invalid username or email")
            raise HTTPException(status_code=401, detail="Invalid credentials") 
        if user.role != "admin":
            raise HTTPException(status_code=403, detail="Not authorized as admin")

        print(f"Login successful: {user.username}")
        token = create_access_token({"sub": user.username, "role": user.role}) 
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        print(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        db.close()
 