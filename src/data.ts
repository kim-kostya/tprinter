import sqlite3 from 'sqlite3'

export namespace data {
    export interface User {
        id: string;
        permission: string[];
    }

    export interface Document {
        id: string;
        author: User;
        path: string;
    }

    var db: sqlite3.Database;

    export function init() {
        sqlite3.verbose()
        db = new sqlite3.Database('./data.sqlite', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Database initialized.');
        })
    }

    export function getUser(userId: number, callback: Function) {
        db.get(`SELECT * FROM users WHERE id=?`, [userId], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            return callback(row as User)
        });
    }
}