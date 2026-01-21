# Ark – Blog & Portfolio

Welcome to my corner on the intenet, a little ark for the flood of information.

## My stack
- Frontend: React, Vite, Typescript
- Backend: Python, FastAPI, SQLAlchemy, Alembic
- Database: PostgreSQL
- Docker & Docker Compose for development and production 
```
ark/
├─ backend/           # FastAPI backend
│   ├─ alembic/
│   │   ├─ versions/
│   │   └─ env.py
│   ├─ app/
│   │   ├─ db/
│   │   │   ├─ models/
│   │   │   │   ├─ __init__.py
│   │   │   │   └─ guestbook.py
│   │   │   ├─ base.py
│   │   │   └─ session.py
│   │   └─ main.py
│   ├─ requirements.txt
│   ├─ alembic.ini
│   └─ Dockerfile
├─ frontend/          # React frontend
│   ├─ public/
│   │   └─ Favicon.png
│   ├─ src/
│   │   ├─ App.tsx
│   │   └─ index.tsx 
│   ├─ Dockerfile
│   ├─ Dockerfile.dev
│   ├─ index.html
│   ├─ package-lock.json
│   ├─ package.json
│   └─ tsconfig.json
├─ .env               # Environment variables
├─ .gitignore
├─ docker-compose.dev.yml
├─ docker-compose.prod.yml 
├─ Makefile
└─ README.md
``` 
## Getting Started
1. Environment Variables

Create a .env file at the root of the project:
```
# Database
DB_USER=testuser
DB_PASSWORD=testpass
DB_NAME=testdb
DB_HOST=db
DB_PORT=5432

# Backend
BACKEND_PORT=5000

# Frontend
FRONTEND_PORT=3000
```

2. Development Mode (With Hot Reload) 

Start dev environment:
`make dev`

Create migration:
`make makemigration m="add guestbook"`

Apply migrations:
`make migrate`

Stop containers:
`make dev-down`

3. Production Mode