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
        rejectUnauthorized: false, // Consider removing this in production
    },
});

// Handle connection events
pool.on("connect", () => {
    console.log("Connected to the database");
    console.log("Database user:", process.env.DB_USER);
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1); // Exit the process on connection errors
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
