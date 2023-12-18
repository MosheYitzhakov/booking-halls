const mySQL = require('mysql2/promise');

require("dotenv").config();

const pool = mySQL.createPool({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'halls'
})

const checkDBConnection = async () => {
    console.log(process.env.HOST)
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