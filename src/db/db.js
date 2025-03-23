const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    idleTimeoutMillis: 10000,   // close idle clients after 10s
    connectionTimeoutMillis: 5000, // timeout if connection takes >5s
    ssl: {
        rejectUnauthorized: false // only for self-signed certs
      }
    
    });

module.exports = pool;
