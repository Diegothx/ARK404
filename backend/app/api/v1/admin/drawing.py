from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session 
from app.db.session import get_db
from app.dependencies.admin_required import admin_required
from app.db.models.drawings import Drawing
from app.schemas.drawing import CollectionDrawingAssignment
from app.utils.drawing import assign_drawing_to_collections
from uuid import uuid4
import shutil
import os
from datetime import datetime

router = APIRouter(
    prefix="/drawings",
    tags=["Admin"],
)

DRAWING_UPLOAD_DIR = os.getenv("DRAWING_UPLOAD_DIR", "uploads")
os.makedirs(DRAWING_UPLOAD_DIR, exist_ok=True)  # create folder if not exists

# -----------------------------
# Upload a drawing
# -----------------------------
@router.post("/" )
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
    extension = file.filename.split(".")[-1] if (file.filename and "." in file.filename) else ""
      
    filename = f"{uuid4()}_{title.replace(' ', '_')}.{extension}"
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

@router.delete("/{drawing_id}")
def delete_drawing(
    drawing_id: int, 
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    drawing = db.query(Drawing).filter(Drawing.id == drawing_id).first()
    if not drawing:
        return {"error": "Drawing not found"}
    
    # Delete file from storage
    if os.path.exists(drawing.file_url):
        os.remove(drawing.file_url)
    
    # Delete from DB
    db.delete(drawing)
    db.commit()
    return {"message": "Drawing deleted"}

@router.post("/collections")
def create_collection(
    name: str = Form(...),
    description: str = Form(None),
    type: str = Form(None),  # sketchbook, franchise, challenge, year, project
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    from app.db.models.drawings import Collection
    collection = Collection(name=name, description=description, type=type)
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return {"message": "Collection created", "collection_id": collection.id}

@router.delete("/collections/{collection_id}")
def delete_collection(
    collection_id: int,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    from app.db.models.drawings import Collection
    collection = db.query(Collection).filter(Collection.id == collection_id).first()
    if not collection:
        return {"error": "Collection not found"}
    
    db.delete(collection)
    db.commit()
    return {"message": "Collection deleted"}

@router.post("/collections/assign")
def assign_drawings_to_collections(
    payload: CollectionDrawingAssignment,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):
    from app.db.models.drawings import Collection, Drawing

    # Validate input
    if not payload.collection_ids or not payload.drawing_ids:
        return {"error": "Both collection_ids and drawing_ids are required"}

    # Fetch collections
    collections = db.query(Collection).filter(
        Collection.id.in_(payload.collection_ids)
    ).all()

    if len(collections) != len(payload.collection_ids):
        return {"error": "One or more collections not found"}

    # Fetch drawings
    drawings = db.query(Drawing).filter(
        Drawing.id.in_(payload.drawing_ids)
    ).all()

    if len(drawings) != len(payload.drawing_ids):
        return {"error": "One or more drawings not found"}

    # Assign
    for drawing in drawings:
        assign_drawing_to_collections(
            db,
            drawing,
            payload.collection_ids
        )

    return {"message": "Drawings successfully assigned to collections"}
