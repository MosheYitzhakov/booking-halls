const { pool } = require('./dbConnection')

const getEvents = async (id_hall = null) => {
    let toSql = "";
    if (id_hall) {
        toSql = `WHERE id_hall = "${id_hall}" `
    }
    try {
        const sql = `
        SELECT *
        FROM events_schedule
        ${toSql}
        ORDER BY date DESC;
        `
        const [res] = await pool.query(sql, [id_hall]);
        return res;
    } catch (error) {
        return error.message
    }
}
// const getFreeEvents = async (date) => {
//     let toSql = "";
//     if (id_hall) {
//         toSql = `WHERE id_hall = "${id_hall}" `
//     }
//     try {
//         const sql = `
//         SELECT *
//         FROM events_schedule
//         WHERE hebrew_date = ?
//         ORDER BY date DESC;
//         `
//         const [res] = await pool.query(sql, [date]);
//         return res;
//     } catch (error) {
//         return error.message
//     }
// }
const postEvents = async (id_hall, hebrew_date, date) => {
    try {
        const sql = `
    INSERT INTO events_schedule (id_hall, hebrew_date, date)
    VALUES (?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_hall, hebrew_date, date])
        if (affectedRows) return insertId
        throw new Error ('Failed to add data')
    } catch (error) {
        return error.message
    }
}

module.exports = { getEvents, postEvents }