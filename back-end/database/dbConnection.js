const mySQL = require('mysql2/promise');
const pool = mySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sr0583261045',
    database: 'information_system'
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