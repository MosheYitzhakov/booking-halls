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

const putInvoices = async (id_invoice, ...args) => {
    
    const [ all ] = [...args]
    // if(!all) return "You cannot enter empty values"
console.log(typeof all);
    // let toSql = "";
    // for (const key in all) {
    //    if(all[key]===null) return -1
    //    toSql +=`${key}= "${all[key]}",`
    // }
    // toSql = toSql.slice(0,-1)
//   return toSql;
    try {
    //     const sql = `
    //     UPDATE invoices
    // SET ${toSql}
    // WHERE id_invoice = "${id_invoice}"
    // `


        // const [{ affectedRows }] = await pool.query(sql);
        // if (affectedRows) return await getTodos(id_user)
        // return 'not update'
        return "all"
    } catch (error) {
        return error.message
    }
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

module.exports = {putInvoices}