
class Drawing {
    "id": number
    "title": string | null
    "description": string | null
    "file_url": string
    "thumbnail_url": string | null
    "drawing_date": string | null
    "is_favorite": boolean
    "collections": number[]
}

class Collection {
    "id": number
    "name": string
    "description": string
    "type": "videogame" | "sketchbook" | "franchise" | "challenge" | "year" | "project" | "character" | "other"
    "drawings": number[]
}
export type { Drawing, Collection}