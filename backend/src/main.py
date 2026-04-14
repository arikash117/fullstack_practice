from fastapi import FastAPI
from src.core.database import engine, Base
from src.api import user, task

# Создаём таблицы (для разработки; в продакшене используй только Alembic!)
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User & Task API",
    description="Simple REST API for managing users and their tasks",
    version="1.0.0"
)

app.include_router(user.router)
app.include_router(task.router)

@app.get("/")
def root():
    return {"message": "API is running! Visit /docs for Swagger UI"}