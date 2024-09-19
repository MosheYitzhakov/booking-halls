const mySQL = require('mysql2/promise');

require("dotenv").config();

const pool = mySQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const checkDBConnection = async () => {
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USER)
    console.log(process.env.DB_NAME)
    try {
        const connection = await pool.getConnection();
        console.log("db connected");
        connection.release();
        return true;
    } catch (error) {
        const message = error.message + "\n" + "can`t connect to db";
        console.log(message);
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_NAME);
        
        return false;
    }
}

module.exports = {checkDBConnection, pool}