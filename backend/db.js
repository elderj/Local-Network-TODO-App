const Database = require("better-sqlite3");

const db = new Database("./data/todos.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT DEFAULT '',
    status TEXT DEFAULT 'backlog'
  )
`).run();

module.exports = db;