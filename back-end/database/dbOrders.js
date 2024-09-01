const { pool } = require('./dbConnection')
const { toJewishDate, formatJewishDateInHebrew} = require("jewish-date");

const getOrders = async (nameM, date = null) => {
    let toSql = "WHERE "
    if (date) {
        toSql += `
         o.date >= '${date}'
        AND `
    }
    toSql += ` id_hall IN (
        select mh.id_hall from managers_halls mh
        join users u
        USING(id_user)
        WHERE u.name = "${nameM}"
        )`;
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
        ${toSql}
        
        order by o.date
        `
        // console.log(sql);
        // return sql
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
        if (all[key] !== null)
            toSql += `${key}= "${all[key]}",`
    }

    if (!toSql) return "You cannot enter empty values"

    toSql = toSql.slice(0, -1)
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

const postOrders = async (...args) => {
    const [{ clientC, clientK, order, dateEvent, invoice }] = args;

    // const str = (obj) => {
    //     let string = ""
    //     for (const key in obj) {
    //         string += `${key},`;
    //     }
    //     return string.slice(0, -1)
    // }


    let conn = null;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction()

        let sql = `
          INSERT INTO users (${Object.keys(clientK)})
         VALUES (?,?,?,?,?)`
        const [clientKS] = await conn.query(sql, Object.values(clientK))
        sql = `
            INSERT INTO users (${Object.keys(clientC)})
             VALUES (?,?,?,?,?)`
        const [clientCS] = await conn.query(sql, Object.values(clientC))
        sql = `
              INSERT INTO orders (${Object.keys(order)})
             VALUES (?,?,?,?,?,?,?,?,?)`

        const [orderS] = await conn.query(sql, Object.values(order))

        sql = `
            INSERT INTO customers_orders (id_c, id_k, id_order)
            VALUES (?,?,?)`
        const [cCO] = await conn.query(sql, [clientCS.insertId, clientKS.insertId, orderS.insertId])

        sql = `
         INSERT INTO events_schedule (${Object.keys(dateEvent)})
         VALUES (?,?,?)`

        const [dateEventS] = await conn.query(sql, Object.values(dateEvent))

        sql = `
       INSERT INTO invoices (id_user, payment,date,hebrew_date)
       VALUES (?,?,?,?)`

        const [invoiceS] = await conn.query(sql, [invoice.submits === 'k' ? clientKS.insertId : clientCS.insertId, invoice.payment, new Date().toISOString().slice(0, 19).replace('T', ' '), formatJewishDateInHebrew(toJewishDate(new Date()))])


        await conn.commit();
        return orderS.insertId
    } catch (error) {

        if (conn) await conn.rollback();
        return error.message;
    } finally {
        if (conn) conn.release();
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