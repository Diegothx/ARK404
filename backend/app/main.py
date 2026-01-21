from fastapi import FastAPI
import os
import psycopg2

app = FastAPI(title="Ark Backend")

DB_URL = os.getenv("DATABASE_URL", f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}")

@app.get("/")
async def root():
    return {"message": "Ark backend is running!"}

@app.get("/db-test")
async def db_test():
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        result = cur.fetchone()
        cur.close()
        conn.close()
        return {"db_connection": result}
    except Exception as e:
        return {"db_connection": "Failed", "error": str(e)}
