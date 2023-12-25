const { pool } = require('./dbConnection')

const getOrders = async (nameM, date = null) => {
    // let toSql = "WHERE id_hall = ?";
    if (date) {
        toSql = `
        WHERE o.date >= '${date}'
        AND id_hall = ?`
    }
    try {
        const sql = `
        SELECT o.*, K.name AS nameK,C.name AS nameC,
        K.phone AS phoneK,C.phone AS phoneC,
        K.email AS emailK,C.email AS emailC
        FROM customers_orders co
        JOIN users AS C ON (id_c=C.id_user)
        JOIN users AS K ON (id_k=K.id_user)
        JOIN orders o
        USING(id_order)
        WHERE id_hall IN (
        select mh.id_hall from managers_halls mh
        join users u
        USING(id_user)
        WHERE u.name = "${nameM}"
        )
        order by co.id_order
        `
        const [res] = await pool.query(sql);
        return res;
    } catch (error) {
        return error.message
    }
}

const putOrders = async (id_order, ...args) => {
    const [all] = [...args]
    let toSql = "";

    for (const key in all) {
        if(all[key] !== null)
        toSql += `${key}= "${all[key]}",`
    }

    if (!toSql) return "You cannot enter empty values"

    toSql = toSql.slice(0, -1)
    //   return toSql;
    try {
        const sql = `
        UPDATE orders
        SET ${toSql}
        WHERE id_order = ?
    `

        const [{ affectedRows }] = await pool.query(sql, [id_order]);
        if (affectedRows) return "updated order"
        return 'not update'
    } catch (error) {
        return error.message
    }


}

const postOrders = async (id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment, hebrew_date) => {
    try {
        const sql = `
    INSERT INTO orders (id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment, hebrew_date, date)
    VALUES (?,?,?,?,?,?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment, hebrew_date, date])
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