from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.core.database import get_db
import src.crud.user as user_crud
import src.schemas.user as user_schema

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=list[user_schema.UserResponse])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return user_crud.get_users(db, skip, limit)

@router.get("/{user_id}", response_model=user_schema.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=user_schema.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    existing = user_crud.get_users(db, limit=1)
    # Проверка на уникальность email
    if any(u.email == user.email for u in existing):
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_crud.create_user(db, user)

@router.patch("/{user_id}", response_model=user_schema.UserResponse)
def update_user(user_id: int, user: user_schema.UserUpdate, db: Session = Depends(get_db)):
    db_user = user_crud.update_user(db, user_id, user)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    deleted = user_crud.delete_user(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")