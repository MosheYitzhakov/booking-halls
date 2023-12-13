const { pool } = require('./dbConnection')

const getManager = async (name, password) => {
    try {
        const sql = `
        SELECT *
        FROM uesrs
        WHERE name = ?
        AND password = ?
        ORDER BY name;
        `
        const [res] = await pool.query(sql, [name, password]);
        return res;
    } catch (error) {
        return error.message
    }

}

const getClients = async (name) => {
    try {
        const sql = `
        SELECT *
        FROM uesrs
        WHERE name = ? 
        ORDER BY name;`
        const [{ affectedRows, insertId }] = await pool.query(sql, [name])
        if (affectedRows) return await getComments(id_post, insertId)
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }

}

const postUsers = async (name, phone, email = null, side) => {
    try {
        const sql = `
    INSERT INTO uesrs (degree, name,phone, email, side)
    VALUES (client,?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [degree, name, phone, email, side])
        if (affectedRows) return insertId;
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }
}

const deleteUsers = async (name) => {
    try {
        const sql = `
    DELETE FROM  users 
    WHERE name =?
    `;
        const [{ affectedRows }] = await pool.query(sql, [name])
        if (affectedRows) return console.log(`dalated user ${name}`);
        return 'The comment not deleted'
    } catch (error) {
        console.log(123);
        return error.message
    }
}

module.exports = { getManager, getClients, postUsers, deleteUsers }