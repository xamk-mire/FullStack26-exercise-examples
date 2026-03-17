from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import Session

from db_models import TaskEntity
from models import Task, TaskCreate, TaskUpdate, Priority


"""
def _ensure_datetime(val):
    if val is None:
        return None
    if isinstance(val, datetime):
        return val
    if isinstance(val, str):
        return datetime.fromisoformat(val.replace("Z", "+00:00"))
    return val


def _entity_to_task(entity: TaskEntity) -> Task:
    created_at = _ensure_datetime(entity.created_at) or datetime.now()
    updated_at = _ensure_datetime(entity.updated_at)
    return Task(
        id=entity.id,
        title=entity.title,
        completed=entity.completed,
        priority=Priority(entity.priority),
        createdAt=created_at,
        updatedAt=updated_at,
    )
"""

def _entity_to_task(entity: TaskEntity) -> Task:
    """Convert SQLAlchemy entity to Pydantic model (API response)."""
    return Task(
        id=entity.id,
        title=entity.title,
        completed=entity.completed,
        priority=Priority(entity.priority),
        createdAt=entity.created_at,
        updatedAt=entity.updated_at
    )


def get_all_tasks(db: Session) -> list[Task]:
    stmt = select(TaskEntity)
    entities = list(db.scalars(stmt))
    return [_entity_to_task(e) for e in entities]


def get_task_by_id(db: Session, task_id: int) -> Task | None:
    entity = db.get(TaskEntity, task_id)
    if not entity:
        return None
    return _entity_to_task(entity)


def create_task(db: Session, body: TaskCreate) -> Task:
    entity = TaskEntity(
        title=body.title,
        completed=body.completed,
        priority=body.priority.value,
    )
    db.add(entity)
    db.commit()
    db.refresh(entity)
    return _entity_to_task(entity)


def update_task(db: Session, task_id: int, body: TaskUpdate) -> Task | None:
    entity = db.get(TaskEntity, task_id)
    if not entity:
        return None
    updates = body.model_dump(exclude_unset=True)
    for key, value in updates.items():
        if key == "title":
            entity.title = value
        elif key == "completed":
            entity.completed = value
        elif key == "priority":
            entity.priority = value.value if hasattr(value, "value") else value
    db.commit()
    db.refresh(entity)
    return _entity_to_task(entity)


def delete_task(db: Session, task_id: int) -> bool:
    entity = db.get(TaskEntity, task_id)
    if not entity:
        return False
    db.delete(entity)
    db.commit()
    return True