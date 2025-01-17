import sqlite3 from "sqlite3";
import { getDatabasePath } from "../helpers/index.js";

// Initialize the SQLite database
const dbPath = getDatabasePath();
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
  db.run(
    `CREATE TABLE IF NOT EXISTS coaches(
      steamid TEXT PRIMARY KEY
    )`,
    (err) => {
      if (err) {
        console.error("Error creating coaches table:", err.message);
      }
    },
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS players(
      _id TEXT PRIMARY KEY,
      firstName TEXT,
      lastName TEXT,
      username TEXT,
      avatar TEXT,
      country TEXT,
      steamid TEXT,
      team TEXT,
      extra TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    },
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS teams(
      _id TEXT PRIMARY KEY,
      name TEXT,
      country TEXT,
      shortName TEXT,
      logo TEXT,
      extra TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    },
  );
});

db.run(
  `CREATE TABLE IF NOT EXISTS matches(
    id TEXT PRIMARY KEY,
    current BOOLEAN,
    left_id TEXT,
    left_wins INTEGER,
    right_id TEXT,
    right_wins INTEGER,
    matchType TEXT,
    vetos TEXT
  )`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  },
);

export default db;
