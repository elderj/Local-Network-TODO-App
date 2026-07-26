import "./App.css";
import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard";
import { TODO_STATUSES } from "./types/todo";
import type { Todo, TodoStatus } from "./types/todo";

const API = "http://192.168.1.190:3030";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch(`${API}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  function addTodo() {
    if (title !== "") {
      fetch("http://192.168.1.190:3030/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          status: "backlog",
        }),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos((prev) => [...prev, newTodo]);
          setTitle("");
          setDesc("");
        });
    }
  }

  function deleteTodo(id: number) {
    fetch(`http://192.168.1.190:3030/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      });
  }

  function saveEdit(id: number, title: string, desc: string) {
    console.log("SAVE EDIT CALLED");
    console.log("ID: " + id);
    console.log("TITLE: " + title);
    console.log("DESC: " + desc);
    fetch(`http://192.168.1.190:3030/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      });
  }

  function updateStatus(id: number, status: TodoStatus) {
    fetch(`http://192.168.1.190:3030/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t)),
        );
      });
  }

  return (
    <div className="container" style={{ padding: 20 }}>
      <h1>Todos</h1>

      <div style={{ marginBottom: 20 }}>
        <h2>Create Todo</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="board">
        {TODO_STATUSES.map((status) => (
          <div className="column" key={status}>
            <h2>{status}</h2>
            {todos
              .filter((todo) => todo.status === status)
              .map((todo) => (
                <TodoCard
                  todo={todo}
                  updateStatus={updateStatus}
                  deleteTodo={deleteTodo}
                  saveEdit={saveEdit}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
