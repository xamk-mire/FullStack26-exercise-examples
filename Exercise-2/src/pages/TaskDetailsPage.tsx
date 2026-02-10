import { Link, useNavigate, useParams } from "react-router-dom";
import type { Task } from "../domain/task";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskDetailsPage({ tasks, onToggle, onDelete }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <section className="card">
        <h2 className="h2">Task not found</h2>
        <p className="muted">The task you are trying to view does not exist.</p>
        <div className="row" style={{ marginTop: 12 }}>
          <Link className="btn" to="/tasks">Back to tasks</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="row">
        <div>
          <h2 className="h2">Task details</h2>
          <p className="muted">View and manage this task.</p>
        </div>
        <div className="row">
          <Link className="btn" to="/tasks">Back</Link>
          <Link className="btn" to={`/tasks/${task.id}/edit`}>Edit</Link>
          <button
            className="btn danger"
            type="button"
            onClick={() => {
              const ok = confirm(`Delete "${task.title}"?`);
              if (!ok) return;
              onDelete(task.id);
              navigate("/tasks");
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="details">
        <div><span className="badge">{task.completed ? "Completed" : "Active"}</span></div>
        <div><strong>Title:</strong> {task.title}</div>
        <div><strong>Priority:</strong> {task.priority}</div>
        <div className="row" style={{ marginTop: 12 }}>
          <button
            className="btn primary"
            type="button"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? "Mark as active" : "Mark as completed"}
          </button>
        </div>
      </div>
    </section>
  );
}
