import sqlite3 from "sqlite3";
import { readFileSync } from "fs";
import { join } from "path";
class SQLiteDatabase {
  db;
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
    this.db.run("PRAGMA foreign_keys = ON");
  }
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
let dbInstance = null;
function getDatabase() {
  if (!dbInstance) {
    const dbPath = join(process.cwd(), "database", "budget_tracker.db");
    dbInstance = new SQLiteDatabase(dbPath);
  }
  return dbInstance;
}
async function initDatabase() {
  const db = getDatabase();
  try {
    const schemaPath = join(process.cwd(), "src", "lib", "database", "schema.sql");
    const schema = readFileSync(schemaPath, "utf-8");
    const statements = schema.split(";").filter((stmt) => stmt.trim());
    for (const statement of statements) {
      await db.run(statement.trim());
    }
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
export {
  getDatabase as g,
  initDatabase as i
};
