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

const putOrders = async (id_order, ...args) => {
    const [all] = [...args]
    let toSql = "";

    for (const key in all) {
        if (!all[key]) return -1
        toSql += `${key}= "${all[key]}",`
    }

    if (toSql === -1) return "You cannot enter empty values"

    toSql = toSql.slice(0, -1)
    //   return toSql;
    try {
        const sql = `
        UPDATE orders
        SET ${toSql}
        WHERE id_order = ?
    `

        const [{ affectedRows }] = await pool.query(sql, [id_order]);
        if (affectedRows) return "updated order "
        return 'not update'
    } catch (error) {
        return error.message
    }


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

const deleteOrders = async (id_order) => {
    try {
        const sql = `
    DELETE FROM  orders 
    WHERE id_order =?
    `;
        const [{ affectedRows }] = await pool.query(sql, [id_order])
        if (affectedRows) return `order ${id_order} deleted`
        return `The order ${id_order} not deleted`
    } catch (error) {
        console.log(123);
        return error.message
    }
}

module.exports = { getOrders, putOrders, postOrders, deleteOrders }