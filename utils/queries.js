require('dotenv').config();

class Queries {
    createTable() {
        return `CREATE TABLE IF NOT EXISTS ${process.env.TABLE} (name VARCHAR(255) NOT NULL, status VARCHAR(255), date VARCHAR(50))`;
    }

    insertTask(name, status, date) {
        return `INSERT INTO ${process.env.TABLE} (name, status, date) VALUES ('${name}', '${status.toUpperCase()}', '${date}')`;
    }

    updateTask(name, status, prevStatus) {
        return `UPDATE ${process.env.TABLE} SET status = '${status.toUpperCase()}' WHERE name='${name}' AND status = '${prevStatus.toUpperCase()}'`;
    }

    getTasks(offset) {
        return `SELECT date as date, SUM(CASE WHEN status IN ('ACTIVE', 'ON-HOLD', 'PENDING') THEN 1 ELSE 0 END) AS open_tasks, SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS inprogress_tasks, SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) AS completed_tasks FROM task GROUP BY date ORDER BY date LIMIT 10 OFFSET ${offset}`;
    }

    getTask(name) {
        return `SELECT SUM(CASE WHEN status IN ('ACTIVE', 'ON-HOLD', 'PENDING') THEN 1 ELSE 0 END) AS open_tasks, SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS inprogress_tasks, SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) AS completed_tasks FROM ${process.env.TABLE} WHERE name = '${name}'`;
    }
}

module.exports = new Queries();