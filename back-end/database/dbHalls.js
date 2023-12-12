const { pool } = require('./dbConnection')

const getHalls = async (name_hall = null, date = null) => {
    let toSql = "";
    if (name_hall) {
        toSql = `WHERE name_hall = "${name_hall}"`
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
// const putSetting = async (name_hall = null,
//     base_price = null,
//     min_guests = null,
//     max_guests = null,
//     min_meals = null,
//     p_b_adults = null,
//     p_b_children = null,
//     p_b_bar = null,
//     p_p_adults = null,
//     p_p_children = null,
//     p_p_bar = null,
//     down_payment = null) => {
//     try {
//         const sql = `
//     INSERT INTO comments (id_post, name, email,body)
//     VALUES (?,?,?,?)`
//     const [{ affectedRows, insertId }] = await pool.query(sql, [id_post, name, email,body])
//     if (affectedRows) return await getComments(id_post,insertId)
//         return 'The comment cannot be inserted'
//     } catch (error) {
//        return error.message 
//     }
// }
const putSetting = async (id_hall, ...args) => {
    const [all] = [...args]
    let toSql = "";

    for (const key in all) {
        if (all[key] === null) return -1
        toSql += `${key}= "${all[key]}",`
    }

    if (toSql === -1) return "You cannot enter empty values"
   
    toSql = toSql.slice(0, -1)
    //   return toSql;
    try {
        const sql = `
        UPDATE hall
    SET ${toSql}
    WHERE id_hall = "${id_invoice}"
    `
        // const [{ affectedRows }] = await pool.query(sql,[id_hall]);
        // if (affectedRows) return await getTodos(id_user)
        // return 'not update'
        return sql
    } catch (error) {
        return error.message
    }
}
module.exports = { getHalls, putSetting }