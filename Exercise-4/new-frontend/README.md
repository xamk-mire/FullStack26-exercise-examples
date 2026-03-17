# Exercise 3 — Frontend example solution

This is the **example frontend solution** for Exercise 3 (Task Tracker with FastAPI backend). It uses:

- **React + TypeScript + Vite**
- **React Router** (BrowserRouter)
- **Tailwind CSS v4** (via `@tailwindcss/vite`) and **daisyUI v5** for styling (cards, buttons, badges, form controls, navbar). No PostCSS or `tailwind.config.js`; Tailwind is imported in CSS with `@import "tailwindcss"` and daisyUI with `@plugin "daisyui"`.
- **Per-page data fetching:** each page fetches the data it needs from the API (no shared context). App only renders routes.
- **API client** (`src/api/tasksApi.ts`) calling the FastAPI backend

## How to run

1. **Backend:** From the Exercise-3 backend folder, run:

   ```bash
   uvicorn main:app --reload
   ```

   (Backend should be at `http://localhost:8000`.)

2. **Frontend:** In this folder, copy `.env.example` to `.env` and install/run:

   ```bash
   cp .env.example .env
   npm install
   npm run dev
   ```

3. Open the dev server URL (e.g. `http://localhost:5173`). The app will load tasks from the API; each page fetches its own data.

## Structure

- **App.tsx** — Renders routes only. No task state or context.
- **TasksListPage** — Fetches `getTasks()` on mount; refetches after toggle/delete.
- **TaskDetailsPage** — Fetches `getTask(id)` on mount; refetches after toggle; navigates to list after delete.
- **TaskFormPage** — Create: no fetch; submit calls `createTask()` then navigates to list. Edit: fetches `getTask(id)` to prefill form; submit calls `updateTask()` then navigates to details.
- **src/api/tasksApi.ts** — `getTasks`, `getTask`, `createTask`, `updateTask`, `deleteTask`.
