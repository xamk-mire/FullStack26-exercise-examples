from sqlalchemy.orm import Session

from models import Task, TaskCreate, TaskUpdate
from repositories.task_repository import (
    get_all_tasks as repo_get_all,
    get_task_by_id as repo_get_by_id,
    create_task as repo_create,
    update_task as repo_update,
    delete_task as repo_delete,
)

def list_tasks(db: Session) -> list[Task]:
    return repo_get_all(db)

def get_task(db: Session, task_id: int) -> Task | None:
    return repo_get_by_id(db, task_id)

def create_task(db: Session, body: TaskCreate) -> Task:
    return repo_create(db, body)

def update_task(db: Session, task_id: int, body: TaskUpdate) -> Task | None:
    return repo_update(db, task_id, body)

def delete_task(db: Session, task_id: int) -> bool:
    return repo_delete(db, task_id)