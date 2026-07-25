const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "../../database/todos.db");

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT DEFAULT '',
    status TEXT DEFAULT 'backlog'
  )
`).run();

module.exports = db;
