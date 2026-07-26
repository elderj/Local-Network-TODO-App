const express = require("express");
const cors = require("cors");

const app = express();

const db = require("../db");

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  const todos = db
    .prepare(
      `
    SELECT * FROM todos
  `,
    )
    .all();

  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title, desc } = req.body;

  const stmt = db.prepare(`
    INSERT INTO todos (title, desc)
    VALUES (?, ?)
  `);

  const result = stmt.run(title, desc);

  const newTodo = db
    .prepare(
      `
    SELECT * FROM todos
    WHERE id = ?
  `,
    )
    .get(result.lastInsertRowid);

  res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { title, desc, status } = req.body;

  db.prepare(
    `
    UPDATE todos
    SET
      title = COALESCE(?, title),
      desc = COALESCE(?, desc),
      status = COALESCE(?, status)
    WHERE id = ?
  `,
  ).run(title, desc, status, req.params.id);

  const updated = db
    .prepare(
      `
    SELECT * FROM todos
    WHERE id = ?
  `,
    )
    .get(req.params.id);

  res.json(updated);
});

app.delete("/todos/:id", (req, res) => {
  db.prepare(
    `
    DELETE FROM todos
    WHERE id = ?
  `,
  ).run(req.params.id);

  res.json({ success: true });
});

app.listen(3030, "0.0.0.0", () => {
  console.log("Todo API running on port 3030");
});
