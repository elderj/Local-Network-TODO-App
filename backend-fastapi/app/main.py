from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .database import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://192.168.1.190:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TodoCreate(BaseModel):
    title: str
    desc: str = ""
    status: str = "backlog"


class TodoUpdate(BaseModel):
    title: str | None = None
    desc: str | None = None
    status: str | None = None    


@app.get("/up")
def health():
    return {"status": "ok"}


@app.get("/todos")
def get_todos():
    db = get_db()

    todos = db.execute(
        "SELECT * FROM todos"
    ).fetchall()

    db.close()

    return [dict(todo) for todo in todos]


@app.post("/todos")
def create_todo(todo: TodoCreate):
    db = get_db()

    cursor = db.execute(
        """
        INSERT INTO todos (title, desc, status)
        VALUES (?, ?, ?)
        """,
        (
            todo.title,
            todo.desc,
            todo.status
        )
    )

    db.commit()

    new_todo = db.execute(
        """
        SELECT * FROM todos
        WHERE id = ?
        """,
        (cursor.lastrowid,)
    ).fetchone()

    db.close()

    return dict(new_todo)


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    db = get_db()

    db.execute(
        """
        DELETE FROM todos
        WHERE id = ?
        """,
        (todo_id,)
    )

    db.commit()
    db.close()

    return {"success": True}


@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate):
    db = get_db()

    db.execute(
        """
        UPDATE todos
        SET
            title = COALESCE(?, title),
            desc = COALESCE(?, desc),
            status = COALESCE(?, status)
        WHERE id = ?
        """,
        (
            todo.title,
            todo.desc,
            todo.status,
            todo_id,
        )
    )

    db.commit()

    updated = db.execute(
        """
        SELECT * FROM todos
        WHERE id = ?
        """,
        (todo_id,)
    ).fetchone()

    db.close()

    return dict(updated)