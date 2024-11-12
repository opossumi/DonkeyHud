import { db } from "../database.js";

export const createPlayer = (
  username,
  steamid,
  team,
  firstName,
  lastName,
  country,
  avatar,
  callback
) => {
  const sql = `INSERT INTO players(username,steamid,team,firstName,lastName,country,avatar) VALUES(?,?,?,?,?,?,?)`;
  db.run(
    sql,
    [username, steamid, team, firstName, lastName, country, avatar],
    function (err) {
      callback(err, { id: this.lastID });
      if (err) {
        console.error(err.message);
      }
    }
  );
};

export const readPlayers = (callback) => {
  const sql = `SELECT * FROM players`;
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
    if (err) {
      return console.error(err.message);
    }
  });
};

export const updatePlayer = (
  id,
  username,
  steamid,
  team,
  firstName,
  lastName,
  country,
  avatar,
  callback
) => {
  const sql = `UPDATE players SET username = ?, steamid = ?, team = ?, firstName = ?, lastName =?, country = ?, avatar = ? WHERE id = ?`;
  db.run(
    sql,
    [username, steamid, team, firstName, lastName, country, avatar, id],
    function (err) {
      callback(err);
      if (err) {
        console.log("Error! ", err);
        return console.error(err.message);
      }
    }
  );
};

export const deletePlayer = (id, callback) => {
  const sql = `DELETE FROM players WHERE id = ?`;
  console.log(id);
  db.run(sql, [id], (err) => {
    callback(err);
    if (err) {
      return console.error(err.message);
    }
  });
};

export const getPlayerBySteamId = (steamid, callback) => {
  const sql = `SELECT * FROM players WHERE steamid = ?`;
  db.get(sql, [steamid], (err, row) => {
    callback(err, row);
    if (err) {
      return console.error(err.message);
    }
    // console.log("Player sent: ", row);
  });
};
