const { pool } = require('./dbConnection')

const getHalls = async (name_hall= null, date = null) => {
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
const getNameHalls = async(name_hall = null)=>{
    let toSql = "";
    if (name_hall) {
        toSql = `WHERE name_hall = "${name_hall}"
        ORDER BY name_hall;`
    }
    try {
        const sql = `
        SELECT name_hall
        FROM halls
        ${toSql}
        `
        const [res] = await pool.query(sql);
        return res;
    } catch (error) {
        return error.message
    }
}
const putSetting = async ( id_user = null, name = null)=>{
// try {
//     const sql = `
// INSERT INTO comments (id_post, name, email,body)
// VALUES (?,?,?,?)`
// const [{ affectedRows, insertId }] = await pool.query(sql, [id_post, name, email,body])
// if (affectedRows) return await getComments(id_post,insertId)
//     return 'The comment cannot be inserted'
// } catch (error) {
//    return error.message 
// }
}


module.exports = {getNameHalls,getHalls  }