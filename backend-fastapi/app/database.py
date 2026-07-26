import os
import sqlite3

DATABASE_PATH = os.getenv(
    "DATABASE_PATH",
    "../database/todos.db"
)

def get_db():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection