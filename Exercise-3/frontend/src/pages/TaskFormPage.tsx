import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Priority, Task } from "../domain/task";

type Props = {
  mode: "create" | "edit";
  tasks: Task[];
  onAdd: (task: Task) => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
};

export default function TaskFormPage({ mode, tasks, onAdd, onUpdate }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const taskToEdit = mode === "edit" ? tasks.find(t => t.id === id) : undefined;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
    }
  }, [mode, taskToEdit]);

  if (mode === "edit" && !taskToEdit) {
    return (
      <section className="card">
        <h2 className="h2">Task not found</h2>
        <p className="muted">Cannot edit because the task does not exist.</p>
        <div className="row" style={{ marginTop: 12 }}>
          <Link className="btn" to="/tasks">Back to tasks</Link>
        </div>
      </section>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = title.trim();
    if (trimmed.length === 0) {
      setError("Title is required.");
      return;
    }
    setError("");

    if (mode === "create") {
      const newId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
      const newTask: Task = {
        id: newId,
        title: trimmed,
        completed: false,
        priority,
        createdAt: Date.now(),
      };
      onAdd(newTask);
      navigate("/tasks");
      return;
    }

    onUpdate(taskToEdit!.id, { title: trimmed, priority });
    navigate(`/tasks/${taskToEdit!.id}`);
  }

  const cancelHref = mode === "create" ? "/tasks" : `/tasks/${taskToEdit!.id}`;

  return (
    <section className="card">
      <div className="row">
        <div>
          <h2 className="h2">{mode === "create" ? "Add Task" : "Edit Task"}</h2>
          <p className="muted">
            {mode === "create" ? "Create a new task." : "Update the selected task."}
          </p>
        </div>
        <div className="row">
          <Link className="btn" to={cancelHref}>Back</Link>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Finish homework"
          />
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" type="submit">
            {mode === "create" ? "Add task" : "Save changes"}
          </button>
          <Link className="btn" to={cancelHref}>Cancel</Link>
        </div>

        {error && <div className="error" role="alert">{error}</div>}
      </form>
    </section>
  );
}
