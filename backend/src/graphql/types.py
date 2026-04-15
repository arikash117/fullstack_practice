import strawberry
from typing import Optional, List
from sqlalchemy.orm import Session
from src.core.database import SessionLocal
from src.models.user import User as UserModel
from src.models.task import Task as TaskModel

@strawberry.type
class Task:
    id: int
    title: str
    description: Optional[str]
    user_id: int
    
    @strawberry.field
    def user(self) -> "User":
        db = SessionLocal()
        try:
            user = db.query(UserModel).filter(UserModel.id == self.user_id).first()
            return User.from_orm(user)
        finally:
            db.close()
    
    @classmethod
    def from_orm(cls, obj: TaskModel) -> "Task":
        """Convert SQLAlchemy model to GraphQL type"""
        return cls(
            id=obj.id,
            title=obj.title,
            description=obj.description,
            user_id=obj.user_id
        )

@strawberry.type
class User:
    id: int
    name: str
    email: str
    
    @strawberry.field
    def tasks(self) -> List[Task]:
        db = SessionLocal()
        try:
            tasks = db.query(TaskModel).filter(TaskModel.user_id == self.id).all()
            return [Task.from_orm(task) for task in tasks]
        finally:
            db.close()
    
    @classmethod
    def from_orm(cls, obj: UserModel) -> "User":
        """Convert SQLAlchemy model to GraphQL type"""
        return cls(
            id=obj.id,
            name=obj.name,
            email=obj.email
        )

# Input типы для мутаций
@strawberry.input
class CreateUserInput:
    name: str
    email: str

@strawberry.input
class UpdateUserInput:
    name: Optional[str] = None
    email: Optional[str] = None

@strawberry.input
class CreateTaskInput:
    title: str
    description: Optional[str] = None
    user_id: int

@strawberry.input
class UpdateTaskInput:
    title: Optional[str] = None
    description: Optional[str] = None
    user_id: Optional[int] = None