import mysql from 'mysql2';
import { gamesData } from './gpt2.js';

const games_events = await gamesData()

export function dataMysql() {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'test10',
    });

    // const games_events = await gamesData()

    connection.connect();



    const insertQuery = `
    INSERT INTO games_events (eventId, team1, team2, rate1, ratex, rate2, rate_history) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
      team1 = VALUES(team1), 
      team2 = VALUES(team2), 
      rate1 = VALUES(rate1), 
      ratex = VALUES(ratex), 
      rate2 = VALUES(rate2), 
      rate_history = VALUES(rate_history)`;

    for (const event of games_events) {
        const rateHistoryJson = JSON.stringify({
            rate1: event.rate1,
            ratex: event.ratex,
            rate2: event.rate2

        });

        const values = [
            event.eventId,
            event.team1,
            event.team2,
            Object.values(event.rate1)[0],
            Object.values(event.ratex)[0],
            Object.values(event.rate2)[0],
            rateHistoryJson
        ];

        connection.query(insertQuery, values, function (error, results, fields) {
            if (error) throw error;
            console.log('Data inserted successfully');
        });
    }

    connection.end();
}



