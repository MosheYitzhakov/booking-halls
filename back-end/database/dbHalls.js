const { pool } = require('./dbConnection')

const getHalls = async (id_hall = null, date = null) => {
    let toSql = "";
    if (id_hall) {
        toSql = `WHERE id_hall = "${id_hall}"`
    }
    if (date) {
        toSql = `JOIN events_schedule es
        WHERE es.hebrew_date IS NOT "${date}"`
    }
    try {
        const sql = `
        SELECT *
        FROM halls h
       JOIN images
        using(id_hall)
        ${toSql}
        `
        const [res] = await pool.query(sql);
        return res;
    } catch (error) {
        return error.message
    }
}
const putSetting = async (id_hall, ...args) => {
    const [all] = [...args]
    let toSql = "";

    for (const key in all) {
        if (!all[key]) return -1
        toSql += `${key}= "${all[key]}",`
    }

    if (toSql === -1) return "You cannot enter empty values"

    toSql = toSql.slice(0, -1)
    //   return toSql;
    try {
        const sql = `
        UPDATE hall
        SET ${toSql}
        WHERE id_hall = ?
    `
        const [{ affectedRows }] = await pool.query(sql,[id_hall]);
        if (affectedRows) return "updated setting "
        return 'not update'
    } catch (error) {
        return error.message
    }
}
module.exports = { getHalls, putSetting }