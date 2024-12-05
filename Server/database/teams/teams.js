import { db } from "../database.js";
import { v4 as uuidv4 } from "uuid";

export const createTeam = (
  name,
  shortName,
  logo,
  country,
  last_updated,
  callback
) => {
  const _id = uuidv4(); // Generate a unique string ID
  const sql = `INSERT INTO teams(_id, name, shortName, logo, country, last_updated) VALUES(?,?,?,?,?,?)`;
  db.run(
    sql,
    [_id, name, shortName, logo, country, last_updated],
    function (err) {
      callback(err, { id: this.lastID });
      if (err) {
        console.error(err.message);
      }
    }
  );
};

export const readTeams = (callback) => {
  const sql = `SELECT * FROM teams`;
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
    if (err) {
      return console.error(err.message);
    }
  });
};

export const updateTeam = (
  id,
  name,
  shortName,
  logo,
  country,
  last_updated,
  callback
) => {
  const sql = `UPDATE teams SET name = ?, shortName = ?, logo = ?, country = ?, last_updated = ? WHERE _id = ?`;
  db.run(
    sql,
    [name, shortName, logo, country, last_updated, id],
    function (err) {
      callback(err);
      if (err) {
        return console.error(err.message);
      }
    }
  );
};

export const deleteTeam = (id, callback) => {
  const sql = `DELETE FROM teams WHERE _id = ?`;
  db.run(sql, [id], (err) => {
    callback(err);
    if (err) {
      return console.error(err.message);
    }
  });
};

export const getTeamByName = (name, callback) => {
  const sql = `SELECT * FROM teams WHERE name = ?`;
  db.get(sql, [name], (err, row) => {
    callback(err, row);
    if (err) {
      return console.error(err.message);
    }
  });
};

export const getTeamById = (id, callback) => {
  const sql = `SELECT * FROM teams WHERE _id = ?`;
  db.get(sql, [id], (err, row) => {
    callback(err, row);
    if (err) {
      return console.error(err.message);
    }
  });
};

export const getTeamLogo = (id, callback) => {
  const sql = `SELECT logo FROM teams WHERE _id = ?`;
  db.get(sql, [id], (err, row) => {
    callback(err, row);
    if (err) {
      return console.error(err.message);
    }
  });
};
