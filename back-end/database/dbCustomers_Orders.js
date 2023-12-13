const { pool } = require('./dbConnection')

const postCO = async (id_c, id_k, id_order) => {
    try {
        const sql = `
    INSERT INTO customers_orders (id_c, id_k, id_order)
    VALUES (?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_c, id_k, id_order])
        if (affectedRows) return insertId
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }
}

const deleteCO = async (id_order) => {
    try {
        const sql = `
        DELETE FROM  customers_orders 
        WHERE id_order = ?
    `;
        const [{ affectedRows }] = await pool.query(sql, [id_order])
        if (affectedRows) return `order ${id_order} deleted`
        return `The order ${id_order} not deleted`
    } catch (error) {
        return error.message
    }
}

module.exports = { postCO, deleteCO };