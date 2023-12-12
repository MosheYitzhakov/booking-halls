const { pool } = require('./dbConnection')

const getOrders = async (id_hall, date = null) => {
    let toSql = "WHERE id_hall = ?";
    if (date) {
        toSql = `
        JOIN events_schedule es
        USING(id_hall)
        WHERE es.date >= '${date}'
        AND id_hall = ?`
    }
    try {
        const sql = `
        SELECT *, K.name AS nameA,C.name AS nameB
        FROM customers_orders
        JOIN users AS C ON (id_c=C.id_user)
        JOIN users AS K ON (id_k=K.id_user)
        JOIN orders
        USING(id_order)
        ${toSql}
        order by customers_orders.id_order
        `
        const [res] = await pool.query(sql, [id_hall]);
        return res;
    } catch (error) {
        return error.message
    }

}

const putOrders = async (id_order, name = null) => {
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
const postOrders = async (id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment) => {
    try {
        const sql = `
    INSERT INTO orders (id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment)
    VALUES (?,?,?,?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment])
        if (affectedRows) return insertId
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }



}
const deleteOrders = async (id_post, id_comment) => {
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

module.exports = { getOrders }