from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Task, TaskCreate, TaskUpdate
from services.task_service import (
    list_tasks as service_list_tasks,
    get_task as service_get_task,
    create_task as service_create_task,
    update_task as service_update_task,
    delete_task as service_delete_task,
)

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("", response_model=list[Task])
def list_tasks(db: Session = Depends(get_db)):
    return service_list_tasks(db)

@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = service_get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("", response_model=Task, status_code=201)
def post_task(body: TaskCreate, db: Session = Depends(get_db)):
    return service_create_task(db, body)

@router.patch("/{task_id}", response_model=Task)
def patch_task(task_id: int, body: TaskUpdate, db: Session = Depends(get_db)):
    task = service_update_task(db, task_id, body)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}", status_code=204)
def remove_task(task_id: int, db: Session = Depends(get_db)):
    if not service_delete_task(db, task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return None