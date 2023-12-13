const { pool } = require('./dbConnection')

const getImages = async (id_hall) => {
 
    try {
        const sql = `
        SELECT *
        FROM images
        WHERE id_hall = ?
        `
        const [res] = await pool.query(sql, [id_hall]);
        return res;
    } catch (error) {
        return error.message
    }

}

const putImages = async (id_image, name) => {

    try {
        const sql = `
        UPDATE images
        SET name = "${name}"
        WHERE id_image = ?
    `

        const [{ affectedRows }] = await pool.query(sql, [id_image]);
        if (affectedRows) return "updated order "
        return 'not update'
    } catch (error) {
        return error.message
    }

}

const postImages = async (id_hall, name) => {
    try {
        const sql = `
    INSERT INTO images (id_hall, name)
    VALUES (?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_hall, name])
        if (affectedRows) return insertId
        return 'The comment cannot be inserted'
    } catch (error) {
        return error.message
    }
}

const deleteImages = async (id_image) => {
    try {
        const sql = `
    DELETE FROM  images 
    WHERE id_image =?
    `;
        const [{ affectedRows }] = await pool.query(sql, [id_image])
        if (affectedRows) return `image ${id_image} deleted`
        return `The order ${id_image} not deleted`
    } catch (error) {
        console.log(123);
        return error.message
    }
}

module.exports = { getImages, putImages, postImages, deleteImages }