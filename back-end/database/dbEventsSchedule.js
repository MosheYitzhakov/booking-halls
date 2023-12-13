const { pool } = require('./dbConnection')

const getEvents = async (id_hall) => {
    try {
        const sql = `
        SELECT *
        FROM events_schedule
        WHERE id_hall = ? 
        ORDER BY date DESC;
        `
        const [res] = await pool.query(sql,[id_hall]);
        return res;
    } catch (error) {
        return error.message
    }

}

// const putEvents = async ( id_user = null, name = null)=>{
// // try {
// //     const sql = `
// // INSERT INTO comments (id_post, name, email,body)
// // VALUES (?,?,?,?)`
// // const [{ affectedRows, insertId }] = await pool.query(sql, [id_post, name, email,body])
// // if (affectedRows) return await getComments(id_post,insertId)
// //     return 'The comment cannot be inserted'
// // } catch (error) {
// //    return error.message 
// // }
// }

const postEvents = async (id_hall, hebrew_date,date)=>{
    try {
        const sql = `
    INSERT INTO events_schedule (id_hall, hebrew_date, date)
    VALUES (?,?,?)`
    const [{ affectedRows, insertId }] = await pool.query(sql, [id_hall, hebrew_date,date])
    if (affectedRows) return insertId
        return 'The comment cannot be inserted'
    } catch (error) {
       return error.message 
    }
    }
    
// const deleteEvents =async (id_post,id_comment) =>{
//     // try {
//     //     const sql = `
//     // DELETE FROM  comments 
//     // WHERE id_post ="${id_post}"
//     // AND id_comment= "${id_comment}"
//     // `;
//     // const [{ affectedRows}] = await pool.query(sql, [id_post,id_comment])
//     // if (affectedRows) return await getComments(id_post)
//     //     return 'The comment not deleted'
//     // } catch (error) {
//     //     console.log(123);
//     //    return error.message 
//     // }
// }

module.exports = {getEvents, postEvents }