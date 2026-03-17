import type { Task } from '../domain/task';
import { getApiBaseUrl } from './config';

const base = () => getApiBaseUrl();

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${base()}/api/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function getTask(id: number): Promise<Task | null> {
  const res = await fetch(`${base()}/api/tasks/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch task');
  return res.json();
}

export async function createTask(body: {
  title: string;
  priority?: Task['priority'];
}): Promise<Task> {
  const res = await fetch(`${base()}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: body.title.trim(),
      completed: false,
      priority: body.priority ?? 'medium',
    }),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(
  id: number,
  patch: { title?: string; completed?: boolean; priority?: Task['priority'] },
): Promise<Task> {
  const res = await fetch(`${base()}/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (res.status === 404) throw new Error('Task not found');
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${base()}/api/tasks/${id}`, { method: 'DELETE' });
  if (res.status === 404) throw new Error('Task not found');
  if (!res.ok) throw new Error('Failed to delete task');
}
