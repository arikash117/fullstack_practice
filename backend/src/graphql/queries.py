import strawberry
from typing import List, Optional
from src.graphql.types import User, Task
from src.core.database import SessionLocal
from src.models.user import User as UserModel
from src.models.task import Task as TaskModel

@strawberry.type
class Query:
    @strawberry.field
    def users(self) -> List[User]:
        """Get all users"""
        db = SessionLocal()
        try:
            users = db.query(UserModel).all()
            return [User.from_orm(user) for user in users]
        finally:
            db.close()
    
    @strawberry.field
    def user(self, id: int) -> Optional[User]:
        """Get user by ID"""
        db = SessionLocal()
        try:
            user = db.query(UserModel).filter(UserModel.id == id).first()
            return User.from_orm(user) if user else None
        finally:
            db.close()
    
    @strawberry.field
    def tasks(self) -> List[Task]:
        """Get all tasks"""
        db = SessionLocal()
        try:
            tasks = db.query(TaskModel).all()
            return [Task.from_orm(task) for task in tasks]
        finally:
            db.close()
    
    @strawberry.field
    def task(self, id: int) -> Optional[Task]:
        """Get task by ID"""
        db = SessionLocal()
        try:
            task = db.query(TaskModel).filter(TaskModel.id == id).first()
            return Task.from_orm(task) if task else None
        finally:
            db.close()