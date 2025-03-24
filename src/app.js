const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/db");
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.get("/test", async (req, res) => {

    //res.send("API is running...");

    try {
        const result = await pool.query("update admins set username = 'aboahmad',updated_at = CURRENT_TIMESTAMP where id = 1");
        pool.set
        res.json(result.rows);
    } catch (err) {
        res.send("Error!");
        console.error(err.message);
        console.log(err);
    }

});


module.exports = app;



