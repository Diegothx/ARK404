from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session 
from app.db.session import get_db
from app.dependencies.admin_required import admin_required
from app.db.models.drawings import Drawing
from app.utils.drawing import assign_drawing_to_collections
from uuid import uuid4
import shutil
import os
from datetime import datetime

router = APIRouter(
    prefix="/drawings",
    tags=["Drawings"],
)

DRAWING_UPLOAD_DIR = os.getenv("DRAWING_UPLOAD_DIR", "uploads")
os.makedirs(DRAWING_UPLOAD_DIR, exist_ok=True)  # create folder if not exists

# -----------------------------
# Upload a drawing
# -----------------------------
@router.post("/")
def upload_drawing(
    title: str = Form(...),
    description: str = Form(None),
    drawing_date: str = Form(None),  # optional 'YYYY-MM-DD'
    collection_ids: str = Form(None), # comma-separated collection IDs
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    # 1️⃣ Save file locally
    filename = f"{uuid4()}_{file.filename}"
    file_path = os.path.join(DRAWING_UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

   
    # 2️⃣ Convert drawing_date
    date_obj = None
    if drawing_date:
        date_obj = datetime.strptime(drawing_date, "%Y-%m-%d").date()
    
    # 3️⃣ Create the drawing
    drawing = Drawing(
        title=title,
        description=description,
        file_url=file_path,
        drawing_date=date_obj,
        is_public=True
    )
    db.add(drawing)
    db.commit()
    db.refresh(drawing)
 
     # 4️⃣ Assign to collections
    if collection_ids:
        ids = [int(cid.strip()) for cid in collection_ids.split(",")]
        assign_drawing_to_collections(db, drawing, ids)