from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from src.core.database import engine, Base
from src.api import user, task
from src.graphql.schema import schema

app = FastAPI(
    title="User & Task API",
    description="REST + GraphQL API for managing users and their tasks",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REST API endpoints
app.include_router(user.router, prefix="/api")
app.include_router(task.router, prefix="/api")

# GraphQL endpoint
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

@app.get("/")
def root():
    return {
        "message": "API is running!",
        "rest_docs": "http://127.0.0.1:8000/docs",
        "graphql_playground": "http://127.0.0.1:8000/graphql"
    }