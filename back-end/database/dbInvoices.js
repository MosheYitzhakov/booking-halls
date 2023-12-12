const { pool } = require('./dbConnection')

const getInvoices = async () => {
    try {
        const sql = `
        SELECT name,phone,email,side,payment,date 
        FROM invoices
        JOIN users
        USING(id_user)
        `
        const [res] = await pool.query(sql);
        return res;
    } catch (error) {
        return error.message
    }

}

const putInvoices = async (id_user = null, name = null) => {
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
const postInvoices = async (id_user, payment, date, hebrew_date) => {
    try {
        const sql = `
    INSERT INTO comments (id_user, payment,date,hebrew_date)
    VALUES (?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_user, payment, date, hebrew_date])
        if (affectedRows) return insertId
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }



}
const deleteInvoices = async (id_post, id_comment) => {
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

module.exports = {}