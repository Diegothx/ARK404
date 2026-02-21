enum GameStatus {
    finished_100 = "finished_100",
    finished_main = "finished_main",
    playing = "playing",
    on_hold = "on_hold",
    casual = "casual",
    backlog = "backlog",
    wishlist = "wishlist",
    dropped = "dropped",
}
class Game {
    "id": number
    "title": string
    "description": string | null
    "release_date": string | null
    "platform": string[] | null
    "genre": string[] | null
    "developer": string | null
    "publisher": string | null
    "cover_url": string | null
    "link": string | null
    "is_favorite": boolean
    "collection_id": number | null
    "status": GameStatus
    "rating": number | null
    "priority": "low" | "medium" | "high"
    "start_date": string | null
    "finish_date": string | null
    "notes": {
        "content": string
        "created_at": string
    }[]
}

export {Game, GameStatus}