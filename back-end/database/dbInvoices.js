const { pool } = require('./dbConnection')

const getInvoices = async (nameM) => {
    try {
        const sql = `
        SELECT i.*, cs.id_order, o.id_hall, u.name,u.phone ,u.email
        FROM invoices i
        JOIN customers_orders cs
         JOIN orders o
        using(id_order)
        JOIN users u
        using(id_user)
          WHERE (i.id_user = cs.id_c OR i.id_user = cs.id_k) 
          AND 
          o.id_hall IN (
            select mh.id_hall from managers_halls mh
            join users u
            USING(id_user)
            WHERE u.name = ?
            )
        `
        const [res] = await pool.query(sql,[nameM]);
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

module.exports = { getInvoices, postInvoices }