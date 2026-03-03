import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import TasksListPage from './pages/TasksListPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TaskFormPage from './pages/TaskFormPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="tasks" element={<TasksListPage />} />
        <Route path="tasks/new" element={<TaskFormPage mode="create" />} />
        <Route path="tasks/:id" element={<TaskDetailsPage />} />
        <Route path="tasks/:id/edit" element={<TaskFormPage mode="edit" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
