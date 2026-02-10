import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Task } from './domain/task';
import { loadTasks, saveTasks } from './storage/tasksStorage';

import Layout from './components/Layout';
import TasksListPage from './pages/TasksListPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TaskFormPage from './pages/TaskFormPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleCompleted(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: Date.now() }
          : t,
      ),
    );
  }

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t,
      ),
    );
  }

  const tasksSorted = [...tasks].sort(
    (a, b) => (b.createdAt || 0) - (a.createdAt || 0),
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/tasks" replace />} />

        <Route
          path="tasks"
          element={
            <TasksListPage
              tasks={tasksSorted}
              onToggle={toggleCompleted}
              onDelete={deleteTask}
            />
          }
        />

        <Route
          path="tasks/new"
          element={
            <TaskFormPage
              mode="create"
              tasks={tasks}
              onAdd={addTask}
              onUpdate={updateTask}
            />
          }
        />

        <Route
          path="tasks/:id"
          element={
            <TaskDetailsPage
              tasks={tasks}
              onToggle={toggleCompleted}
              onDelete={deleteTask}
            />
          }
        />

        <Route
          path="tasks/:id/edit"
          element={
            <TaskFormPage
              mode="edit"
              tasks={tasks}
              onAdd={addTask}
              onUpdate={updateTask}
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
