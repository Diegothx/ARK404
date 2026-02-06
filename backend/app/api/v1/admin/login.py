from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.models import User
from app.db.session import get_db
from app.utils.security import verify_password, create_access_token

router = APIRouter(tags=["Admin"])

@router.post("/admin/login")
def admin_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        (User.username == form_data.username) |
        (User.email == form_data.username)
    ).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized as admin")

    token = create_access_token(
        {"sub": user.username, "role": user.role}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
