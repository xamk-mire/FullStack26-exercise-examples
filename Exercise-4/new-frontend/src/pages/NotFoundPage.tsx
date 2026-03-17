import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Not found</h2>
        <p className="text-base-content/70">
          The page you are looking for does not exist.
        </p>
        <div className="card-actions mt-4">
          <Link className="btn btn-primary" to="/tasks">
            Back to tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
