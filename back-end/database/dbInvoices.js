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

const postInvoices = async (id_user, payment, date, hebrew_date) => {
    try {
        const sql = `
    INSERT INTO invoices (id_user, payment,date,hebrew_date)
    VALUES (?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_user, payment, date, hebrew_date])
        if (affectedRows) return insertId
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }



}

module.exports = {getInvoices, postInvoices}