from models import Task, TaskCreate, TaskUpdate
from store import (
    get_all_tasks as repo_get_all,
    get_task_by_id as repo_get_by_id,
    create_task as repo_create,
    update_task as repo_update,
    delete_task as repo_delete,
)

def list_tasks() -> list[Task]:
    return repo_get_all()

def get_task(task_id: str) -> Task | None:
    return repo_get_by_id(task_id)

def create_task(body: TaskCreate) -> Task:
    return repo_create(body)

def update_task(task_id: str, body: TaskUpdate) -> Task | None:
    return repo_update(task_id, body)

def delete_task(task_id: str) -> bool:
    return repo_delete(task_id)