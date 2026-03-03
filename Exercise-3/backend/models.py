from enum import Enum
from pydantic import BaseModel
from typing import Optional

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Task(BaseModel):
    id: str
    title: str
    completed: bool = False
    priority: Priority = Priority.medium
    createdAt: int  # timestamp in milliseconds (same as frontend Date.now())
    updatedAt: Optional[int] = None

class TaskCreate(BaseModel):
    """Request body for creating a task (id and timestamps are set by backend)."""
    title: str
    completed: bool = False
    priority: Priority = Priority.medium

class TaskUpdate(BaseModel):
    """Request body for PATCH: only include fields that change."""
    title: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[Priority] = None