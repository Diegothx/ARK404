from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.api.v1.public import   health, quotes, guestbook, drawing  # Import quotes router
from app.api.v1.admin import login, quotes as adminQuotes, guestbook as adminGuestbook, drawing as adminDrawing  # Ensure admin login routes are included
from app.initial_data import create_admin

import os

app = FastAPI(title="Ark Backend")

app.include_router(health.router)
app.include_router(quotes.router)
app.include_router(guestbook.router)
app.include_router(login.router) 
app.include_router(adminQuotes.router)
app.include_router(adminGuestbook.router)
app.include_router(adminDrawing.router)
app.include_router(drawing.router)
# Detect if running in dev
ENV = os.getenv("ENV", "development")
if ENV == "production":
    frontend_urls = os.getenv("FRONTEND_URLS", "")
    if not frontend_urls:
        raise ValueError("FRONTEND_URLS must be set in production!")
    allow_origins = [url.strip() for url in frontend_urls.split(",") if url.strip()]
else:
    allow_origins = ["*"]  # Dev: allow all

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    create_admin()