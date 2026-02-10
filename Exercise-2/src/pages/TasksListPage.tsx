import { Link } from "react-router-dom";
import type { Task } from "../domain/task";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TasksListPage({ tasks, onToggle, onDelete }: Props) {
  return (
    <section className="card">
      <div className="row">
        <div>
          <h2 className="h2">Tasks</h2>
          <p className="muted">Click a task title to open details.</p>
        </div>
        <div className="row">
          <Link className="btn primary" to="/tasks/new">+ Add Task</Link>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty">
          No tasks yet. Create your first one using <strong>Add Task</strong>.
        </div>
      ) : (
        <ul className="list" aria-label="Task list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? "task completed" : "task"}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                aria-label={`Toggle completion for ${task.title}`}
              />

              <div className="taskBody">
                <Link className="taskTitle" to={`/tasks/${task.id}`}>
                  {task.title}
                </Link>
                <div className="taskMeta">
                  <span className="badge">{task.priority}</span>
                  <span className="badge">{task.completed ? "completed" : "active"}</span>
                </div>
              </div>

              <div className="taskActions">
                <Link className="btn" to={`/tasks/${task.id}/edit`}>Edit</Link>
                <button
                  className="btn danger"
                  type="button"
                  onClick={() => {
                    const ok = confirm(`Delete "${task.title}"?`);
                    if (ok) onDelete(task.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
