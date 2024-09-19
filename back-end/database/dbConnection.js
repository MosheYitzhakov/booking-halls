const mySQL = require('mysql2/promise');

require("dotenv").config();

const pool = mySQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const checkDBConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("db connected");
        connection.release();
        return true;
    } catch (error) {
        const message = error.message + "\n" + "can`t connect to db";
        console.log(message);
        return false;
    }
}

module.exports = {checkDBConnection, pool}