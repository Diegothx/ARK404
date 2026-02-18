from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.public import health, quotes, guestbook, drawing, gameBacklog
from app.api.v1.admin import login, quotes as adminQuotes, guestbook as adminGuestbook, drawing as adminDrawing, gameBacklog as adminGameBacklog
from app.initial_data import create_admin
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
 
import os

 

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_admin()
    yield

app = FastAPI(title="Ark Backend", lifespan=lifespan)


app.include_router(health.router)
app.include_router(quotes.router)
app.include_router(guestbook.router)
app.include_router(login.router) 
app.include_router(adminQuotes.router)
app.include_router(adminGuestbook.router)
app.include_router(adminDrawing.router)
app.include_router(drawing.router)
app.include_router(gameBacklog.router)
app.include_router(adminGameBacklog.router)
# Detect if running in dev
ENV = os.getenv("ENV", "development")
if ENV == "production":
    frontend_urls = os.getenv("FRONTEND_URLS", "")
    if not frontend_urls:
        raise ValueError("FRONTEND_URLS must be set in production!")
    allow_origins = [url.strip() for url in frontend_urls.split(",") if url.strip()]
else:
    allow_origins = ["*"]  # Dev: allow all

DRAWING_UPLOAD_DIR = os.getenv("DRAWING_UPLOAD_DIR", "uploads")
SCREENSHOT_UPLOAD_DIR = os.getenv("SCREENSHOT_UPLOAD_DIR", "uploads")

os.makedirs("/uploads", exist_ok=True)
os.makedirs(DRAWING_UPLOAD_DIR, exist_ok=True)
os.makedirs(SCREENSHOT_UPLOAD_DIR, exist_ok=True)

app.mount("/uploads/drawings", StaticFiles(directory=DRAWING_UPLOAD_DIR), name="drawings")
app.mount("/uploads/screenshots", StaticFiles(directory=SCREENSHOT_UPLOAD_DIR), name="screenshots")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 