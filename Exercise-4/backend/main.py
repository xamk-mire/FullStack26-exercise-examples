from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.tasks import router as tasks_router

app = FastAPI(title="Task Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Task Tracker API is running"}

app.include_router(tasks_router, prefix="/api")