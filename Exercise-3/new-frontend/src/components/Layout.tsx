import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Task Tracker</h1>
          <span className="badge badge-ghost badge-sm ml-2">
            React + TypeScript + Vite (Exercise 3)
          </span>
        </div>
        <div className="flex-none gap-2">
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `btn btn-ghost btn-sm ${isActive ? 'btn-active' : ''}`
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/tasks/new"
            className={({ isActive }) =>
              `btn btn-ghost btn-sm ${isActive ? 'btn-active' : ''}`
            }
          >
            Add Task
          </NavLink>
        </div>
      </div>

      <main className="container mx-auto max-w-3xl p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
