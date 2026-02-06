from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import os

# Required environment variables
try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ["JWT_ACCESS_TOKEN_EXPIRE_MINUTES"])
except KeyError:
    raise RuntimeError("Environment variable JWT_ACCESS_TOKEN_EXPIRE_MINUTES is required")

try:
    SECRET_KEY = os.environ["JWT_SECRET_KEY"]
except KeyError:
    raise RuntimeError("Environment variable JWT_SECRET_KEY is required")

try:
    ALGORITHM = os.environ["JWT_ALGORITHM"]
except KeyError:
    raise RuntimeError("Environment variable JWT_ALGORITHM is required")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # contains e.g. {"sub": "admin"}
    except JWTError:
        return None
