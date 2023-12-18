const { pool } = require('./dbConnection')

const getManager = async (name, password) => {
    try {
        const sql = `
        SELECT *
        FROM uesrs
        WHERE name = ?
        AND password = ?
        `
        const [res] = await pool.query(sql, [name, password]);
        return res;
    } catch (error) {
        return error.message
    }

}

const getClients = async (id_user) => {
    try {
        const sql = `
        SELECT *
        FROM uesrs
        WHERE id_user = ? 
  `
        const [res] = await pool.query(sql, [id_user])
        return res;
    } catch (error) {
        return error.message
    }

}

const postClients = async (name, phone, email = null, side) => {
    try {
        const sql = `
    INSERT INTO users (degree, name,phone, email, side)
    VALUES (?,?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, ["client", name, phone, email, side])
        if (affectedRows) return insertId;
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }
}

const deleteUsers = async (id_user) => {
    try {
        const sql = `
    DELETE FROM  users 
    WHERE id_user =?
    `;
        const [{ affectedRows }] = await pool.query(sql, [id_user])
        if (affectedRows) return console.log(`dalated user ${id_user}`);
        return 'The comment not deleted'
    } catch (error) {
        console.log(123);
        return error.message
    }
}

module.exports = { getManager, getClients, postClients, deleteUsers }