import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Task } from '../domain/task';
import { getTasks, updateTask, deleteTask } from '../api/tasksApi';

export default function TasksListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error('Failed to load tasks:', err));
  }, []);

  const refetch = () => getTasks().then(setTasks);
  const tasksSorted = [...tasks].sort(
    (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="card-title">Tasks</h2>
            <p className="text-base-content/70 text-sm">
              Click a task title to open details.
            </p>
          </div>
          <Link className="btn btn-primary" to="/tasks/new">
            + Add Task
          </Link>
        </div>

        {tasksSorted.length === 0 ? (
          <div className="rounded-lg border border-dashed border-base-300 bg-base-200/50 p-6 text-center text-base-content/70">
            No tasks yet. Create your first one using{' '}
            <strong className="text-base-content">Add Task</strong>.
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2" aria-label="Task list">
            {tasksSorted.map((task) => (
              <li
                key={task.id}
                className={`flex flex-wrap items-center gap-3 rounded-lg border border-base-300 bg-base-200/50 p-3 transition-colors ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    updateTask(task.id, {
                      completed: !task.completed,
                    }).then(refetch);
                  }}
                  className="checkbox checkbox-primary checkbox-sm"
                  aria-label={`Toggle completion for ${task.title}`}
                />

                <div className="min-w-0 flex-1">
                  <Link
                    className={`font-semibold hover:underline ${
                      task.completed
                        ? 'text-base-content/60 line-through'
                        : 'text-primary'
                    }`}
                    to={`/tasks/${task.id}`}
                  >
                    {task.title}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="badge badge-outline badge-sm">
                      {task.priority}
                    </span>
                    <span className="badge badge-ghost badge-sm">
                      {task.completed ? 'completed' : 'active'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    className="btn btn-ghost btn-sm"
                    to={`/tasks/${task.id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-error btn-sm"
                    type="button"
                    onClick={() => {
                      const ok = confirm(`Delete "${task.title}"?`);
                      if (ok) deleteTask(task.id).then(refetch);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
