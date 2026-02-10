import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">Task Tracker</h1>
          <p className="subtitle">React + TypeScript + Vite</p>
        </div>

        <nav className="nav" aria-label="Primary navigation">
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Tasks
          </NavLink>
          <NavLink
            to="/tasks/new"
            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
          >
            Add Task
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
