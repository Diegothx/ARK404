from fastapi import Depends, HTTPException
from app.dependencies.get_current_user import get_current_user
from app.db.models import User


def admin_required(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized as admin")
    return current_user
    