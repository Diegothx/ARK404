from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from app.api.v1 import guestbook, health
import os

app = FastAPI(title="Ark Backend")

app.include_router(health.router)
app.include_router(guestbook.router)


# Detect if running in dev
ENV = os.getenv("ENV", "development")

if ENV == "production":
    # Explicit production origin(s)
    allow_origins = [os.getenv("FRONTEND_URLS", "").split(",")[0]]
else:
    # Dev: allow all origins inside Docker + host browser
    allow_origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 