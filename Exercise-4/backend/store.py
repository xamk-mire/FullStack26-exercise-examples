import time
import uuid
from models import Task, TaskCreate, TaskUpdate, Priority

# In-memory list (resets when the server restarts)
_tasks: list[Task] = []

def _now() -> int:
    """Return current time in milliseconds (same as JavaScript Date.now())."""
    return int(time.time() * 1000)

def get_all_tasks() -> list[Task]:
    return list(_tasks)

def get_task_by_id(task_id: str) -> Task | None:
    for t in _tasks:
        if t.id == task_id:
            return t
    return None

def create_task(body: TaskCreate) -> Task:
    task_id = str(uuid.uuid4())
    now = _now()
    task = Task(
        id=task_id,
        title=body.title,
        completed=body.completed,
        priority=body.priority,
        createdAt=now,
        updatedAt=None,
    )
    _tasks.append(task)
    return task

def update_task(task_id: str, body: TaskUpdate) -> Task | None:
    task = get_task_by_id(task_id)
    if not task:
        return None
    # Only apply fields that were sent in the request
    updates = body.model_dump(exclude_unset=True)
    updates["updatedAt"] = _now()
    updated = task.model_copy(update=updates)
    idx = next(i for i, t in enumerate(_tasks) if t.id == task_id)
    _tasks[idx] = updated
    return updated

def delete_task(task_id: str) -> bool:
    global _tasks
    before = len(_tasks)
    _tasks = [t for t in _tasks if t.id != task_id]
    return len(_tasks) < before