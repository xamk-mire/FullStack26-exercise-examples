# Task Tracker (React + TypeScript + Vite) — Example Solution

## Features

- Routes (BrowserRouter):
  - /tasks
  - /tasks/new
  - /tasks/:id
  - /tasks/:id/edit
- Add / Edit / Delete / Toggle completion
- localStorage persistence (`taskTracker.tasks.v1`)

## Run locally

1. Unzip
2. In the folder:
   - npm install
   - npm run dev
3. Open the shown localhost URL

## Notes

- If you refresh, tasks should still be there (saved to localStorage).
- To reset data, clear localStorage for the key `taskTracker.tasks.v1` in DevTools.
