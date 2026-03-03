import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Priority, Task } from '../domain/task';
import { getTask, createTask, updateTask } from '../api/tasksApi';

type Props = {
  mode: 'create' | 'edit';
};

export default function TaskFormPage({ mode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskToEdit, setTaskToEdit] = useState<Task | null | undefined>(
    mode === 'create' ? null : undefined
  );

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode !== 'edit' || !id) {
      setTaskToEdit(mode === 'create' ? null : undefined);
      return;
    }
    getTask(id)
      .then((t) => setTaskToEdit(t ?? null))
      .catch(() => setTaskToEdit(null));
  }, [mode, id]);

  useEffect(() => {
    if (mode === 'edit' && taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
    }
  }, [mode, taskToEdit]);

  if (mode === 'edit' && taskToEdit === undefined) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="text-base-content/70">Loading…</p>
        </div>
      </div>
    );
  }

  if (mode === 'edit' && taskToEdit === null) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Task not found</h2>
          <p className="text-base-content/70">
            Cannot edit because the task does not exist.
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = title.trim();
    if (trimmed.length === 0) {
      setError('Title is required.');
      return;
    }
    setError('');

    if (mode === 'create') {
      await createTask({ title: trimmed, priority });
      navigate('/tasks');
      return;
    }
    const task = taskToEdit as Task;
    await updateTask(task.id, { title: trimmed, priority });
    navigate(`/tasks/${task.id}`);
  }

  const cancelHref =
    mode === 'create' ? '/tasks' : `/tasks/${(taskToEdit as Task).id}`;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="card-title">
              {mode === 'create' ? 'Add Task' : 'Edit Task'}
            </h2>
            <p className="text-base-content/70 text-sm">
              {mode === 'create'
                ? 'Create a new task.'
                : 'Update the selected task.'}
            </p>
          </div>
          <Link className="btn btn-ghost btn-sm" to={cancelHref}>
            Back
          </Link>
        </div>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-control w-full">
            <label className="label" htmlFor="title">
              <span className="label-text">Title *</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Finish homework"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="priority">
              <span className="label-text">Priority</span>
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="select select-bordered w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button className="btn btn-primary" type="submit">
              {mode === 'create' ? 'Add task' : 'Save changes'}
            </button>
            <Link className="btn btn-ghost" to={cancelHref}>
              Cancel
            </Link>
          </div>

          {error && (
            <div className="alert alert-error" role="alert">
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
