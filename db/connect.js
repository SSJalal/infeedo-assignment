const { Client } = require("pg");
const queries = require('../utils/queries');
require('dotenv').config();
 
exports.connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DB,
            password: process.env.PASSWORD,
            port: process.env.DB_PORT
        })
 
        await client.connect();
        await client.query(queries.createTable());
        return client;
    } catch (error) {
        console.error('DB connection error: ', error);
        throw new Error('Connection error');
    }
}