import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Task } from '../domain/task';
import { getTask, updateTask, deleteTask } from '../api/tasksApi';

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setTask(null);
      return;
    }
    getTask(id)
      .then((t) => setTask(t ?? null))
      .catch(() => setTask(null));
  }, [id]);

  if (task === undefined) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="text-base-content/70">Loading…</p>
        </div>
      </div>
    );
  }

  if (task === null) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Task not found</h2>
          <p className="text-base-content/70">
            The task you are trying to view does not exist.
          </p>
          <div className="card-actions mt-4">
            <Link className="btn btn-ghost" to="/tasks">
              Back to tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const refetch = () => id && getTask(id).then((t) => setTask(t ?? null));

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="card-title">Task details</h2>
            <p className="text-base-content/70 text-sm">
              View and manage this task.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="btn btn-ghost btn-sm" to="/tasks">
              Back
            </Link>
            <Link
              className="btn btn-outline btn-sm"
              to={`/tasks/${task.id}/edit`}
            >
              Edit
            </Link>
            <button
              className="btn btn-error btn-sm"
              type="button"
              onClick={() => {
                const ok = confirm(`Delete "${task.title}"?`);
                if (!ok) return;
                deleteTask(task.id).then(() => navigate('/tasks'));
              }}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div>
            <span
              className={`badge ${
                task.completed ? 'badge-success' : 'badge-warning'
              }`}
            >
              {task.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          <div>
            <strong className="text-base-content/80">Title:</strong>{' '}
            <span className="text-base-content">{task.title}</span>
          </div>
          <div>
            <strong className="text-base-content/80">Priority:</strong>{' '}
            <span className="badge badge-outline">{task.priority}</span>
          </div>
          <div className="mt-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                updateTask(task.id, {
                  completed: !task.completed,
                }).then(refetch);
              }}
            >
              {task.completed ? 'Mark as active' : 'Mark as completed'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
