import strawberry
from typing import Optional
from src.graphql.types import User, Task, CreateUserInput, UpdateUserInput, CreateTaskInput, UpdateTaskInput
from src.core.database import SessionLocal
from src.models.user import User as UserModel
from src.models.task import Task as TaskModel

@strawberry.type
class Mutation:
    # User mutations
    @strawberry.mutation
    def create_user(self, input: CreateUserInput) -> User:
        """Create a new user"""
        db = SessionLocal()
        try:
            user = UserModel(name=input.name, email=input.email)
            db.add(user)
            db.commit()
            db.refresh(user)
            return User.from_orm(user)
        finally:
            db.close()
    
    @strawberry.mutation
    def update_user(self, id: int, input: UpdateUserInput) -> Optional[User]:
        """Update an existing user"""
        db = SessionLocal()
        try:
            user = db.query(UserModel).filter(UserModel.id == id).first()
            if not user:
                return None
            
            if input.name is not None:
                user.name = input.name
            if input.email is not None:
                user.email = input.email
            
            db.commit()
            db.refresh(user)
            return User.from_orm(user)
        finally:
            db.close()
    
    @strawberry.mutation
    def delete_user(self, id: int) -> bool:
        """Delete a user"""
        db = SessionLocal()
        try:
            user = db.query(UserModel).filter(UserModel.id == id).first()
            if not user:
                return False
            
            db.delete(user)
            db.commit()
            return True
        finally:
            db.close()
    
    # Task mutations
    @strawberry.mutation
    def create_task(self, input: CreateTaskInput) -> Task:
        """Create a new task"""
        db = SessionLocal()
        try:
            task = TaskModel(
                title=input.title,
                description=input.description,
                user_id=input.user_id
            )
            db.add(task)
            db.commit()
            db.refresh(task)
            return Task.from_orm(task)
        finally:
            db.close()
    
    @strawberry.mutation
    def update_task(self, id: int, input: UpdateTaskInput) -> Optional[Task]:
        """Update an existing task"""
        db = SessionLocal()
        try:
            task = db.query(TaskModel).filter(TaskModel.id == id).first()
            if not task:
                return None
            
            if input.title is not None:
                task.title = input.title
            if input.description is not None:
                task.description = input.description
            if input.user_id is not None:
                task.user_id = input.user_id
            
            db.commit()
            db.refresh(task)
            return Task.from_orm(task)
        finally:
            db.close()
    
    @strawberry.mutation
    def delete_task(self, id: int) -> bool:
        """Delete a task"""
        db = SessionLocal()
        try:
            task = db.query(TaskModel).filter(TaskModel.id == id).first()
            if not task:
                return False
            
            db.delete(task)
            db.commit()
            return True
        finally:
            db.close()