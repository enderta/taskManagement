const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
        console.log(process.env.DB_USER)
    }
});

module.exports = pool;