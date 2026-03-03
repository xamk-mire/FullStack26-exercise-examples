import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="card">
      <h2 className="h2">Not found</h2>
      <p className="muted">The page you are looking for does not exist.</p>
      <div className="row" style={{ marginTop: 12 }}>
        <Link className="btn" to="/tasks">Back to tasks</Link>
      </div>
    </section>
  );
}
