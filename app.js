const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db");

dotenv.config();

const app = express();

app.use(express.json());


app.get("/test", async (req, res) => {

    //res.send("API is running...");

    try {
        const result = await pool.query("SELECT * FROM admins");
        res.json(result.rows);
    } catch (err) {
        res.send("Error!");
        console.error(err.message);
    }

});


const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
    console.log(`\nTest route: http://localhost:${PORT}/test`)
}
);



