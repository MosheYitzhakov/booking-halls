const { pool } = require('./dbConnection')

const getManager = async (name, password) => {
    // let toSql = "";
    // if (id_comment) {
    //     toSql = `AND id_comment = "${id_comment}"`
    // }
    // try {
    //     const sql = `
    //     SELECT *
    //     FROM comments
    //     WHERE id_post = "${id_post}" 
    //     ${toSql}
    //     ORDER BY id_comment;
    //     `
    //     const [res] = await pool.query(sql);
    //     return res;
    // } catch (error) {
    //     return error.message
    // }

}
const getClients = async ( id_user = null, name = null)=>{
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


const postClient = async ( name, phone, email = null,side)=>{
    try {
        const sql = `
    INSERT INTO uesrs (degree, name,phone, email, side)
    VALUES (client,?,?,?,?)`
    const [{ affectedRows, insertId }] = await pool.query(sql, [degree, name, phone, email,side])
    if (affectedRows) return insertId;
        return 'The comment cannot be inserted'
    } catch (error) {
       return error.message 
    }
    }

const deleteClient =async (id_post,id_comment) =>{
    // try {
    //     const sql = `
    // DELETE FROM  comments 
    // WHERE id_post ="${id_post}"
    // AND id_comment= "${id_comment}"
    // `;
    // const [{ affectedRows}] = await pool.query(sql, [id_post,id_comment])
    // if (affectedRows) return await getComments(id_post)
    //     return 'The comment not deleted'
    // } catch (error) {
    //     console.log(123);
    //    return error.message 
    // }
}

module.exports = {  }