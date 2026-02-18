from sqlalchemy.orm import Session
from app.db.models.drawings import Drawing, Collection, DrawingCollection

def assign_drawing_to_collections(
    db: Session,
    drawing: Drawing,
    collection_ids: list[int] | None = None
):
    """
    Assign a drawing to one or multiple collections.

    - Automatically sets `position`.
    - Skips invalid collection IDs.
    """
    if not collection_ids:
        return

    for cid in collection_ids:
        collection = db.get(Collection, cid)
        if not collection:
            continue  # skip invalid IDs

        # Determine position for sketchbooks
        position = None
        last_page = (
            db.query(DrawingCollection)
            .filter(DrawingCollection.collection_id == collection.id)
            .order_by(DrawingCollection.position.desc())
            .first()
        ) 
        last_position = last_page.position or 0 if last_page else 0
        position = last_position + 1

        assoc = DrawingCollection(
            drawing_id=drawing.id,
            collection_id=collection.id,
            position=position
        )
        db.add(assoc)

    db.commit()
