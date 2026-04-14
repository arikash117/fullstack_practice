from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.core.database import get_db
import src.crud.task as task_crud
import src.schemas.task as task_schema

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=list[task_schema.TaskResponse])
def list_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return task_crud.get_tasks(db, skip, limit)

@router.get("/{task_id}", response_model=task_schema.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = task_crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/", response_model=task_schema.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: task_schema.TaskCreate, db: Session = Depends(get_db)):
    return task_crud.create_task(db, task)

@router.patch("/{task_id}", response_model=task_schema.TaskResponse)
def update_task(task_id: int, task: task_schema.TaskUpdate, db: Session = Depends(get_db)):
    db_task = task_crud.update_task(db, task_id, task)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted = task_crud.delete_task(db, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")