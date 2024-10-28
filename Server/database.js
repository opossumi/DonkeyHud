import sqlite3 from 'sqlite3';
const database = 'Database.db';

export let db = new sqlite3.Database(database, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
    db.run(`CREATE TABLE IF NOT EXISTS players(id INTEGER PRIMARY KEY,alias,steam_id,team,real_name,country,avatar,last_updated)`, (err) => {
        if (err) {
            console.error(err.message);
        }
        // console.log('Players Table Ready.');
    });
    db.run(`CREATE TABLE IF NOT EXISTS teams(id INTEGER PRIMARY KEY,name,shortName,logo,country,last_updated)`, (err) => {
        if (err) {
            console.error(err.message);
        }
        // console.log('Teams Table Ready.');
    });
    db.run(`CREATE TABLE IF NOT EXISTS matches(id INTEGER PRIMARY KEY, current, left, right, matchType, vetos)`, (err) => {
        if (err) {
            console.error(err.message);
        }
        // console.log('Matches Table Ready.');
    });
    // db.run(`CREATE TABLE IF NOT EXISTS current_match(id INTEGER PRIMARY KEY)`, (err) => {
    //     if (err) {
    //         console.error(err.message);
    //     }
    //     console.log('Current Match Table Ready.');
    // });
    // db.run(`DROP TABLE IF EXISTS current_match`, (err) => {
    //     if (err) {
    //         console.error(err.message);
    //     }
    //     console.log('Teams matches Dropped.');
    // });
});

