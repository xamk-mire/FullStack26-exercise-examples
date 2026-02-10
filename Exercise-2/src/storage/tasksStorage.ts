import type { Task } from "../domain/task";

const KEY = "taskTracker.tasks.v1";

export function loadTasks(): Task[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function clearTasks(): void {
  localStorage.removeItem(KEY);
}
