const { pool } = require("./dbConnection");

const getHalls = async (name = null) => {
  let toSql = "";
  if (name) {
    toSql = `
        WHERE name_hall = "${name}"`;
  }
  try {
    const sql = `
        SELECT *
        FROM halls h
        ${toSql}
        ORDER BY name_hall;
        `;
    const [res] = await pool.query(sql);
    return res;
  } catch (error) {
    return error.message;
  }
};
const getSettings = async (nameM) => {
  let toSql = "";
  // if (name) {
  //     toSql = `

  //     WHERE name_hall = "${name}"`
  // }
  try {
    const sql = `
        select h.*, u.* 
FROM halls h
JOIN managers_halls ms
USING(id_hall)
LEFT Join users u
USING(id_user)
WHERE u.name = ?
        `;
    const [res] = await pool.query(sql, [nameM]);
    return res;
  } catch (error) {
    return error.message;
  }
};
const getHallsForDate = async (date) => {
  try {
    const sql = `
        SELECT * 
        FROM halls h 
        WHERE id_hall 
        NOT IN (SELECT id_hall 
            FROM events_schedule es 
            WHERE es.hebrew_date = '${date}')
        `;
    const [res] = await pool.query(sql);
    return res;
  } catch (error) {
    return error.message;
  }
};
const putSetting = async (id_hall, ...args) => {
  const [all] = [...args];
  let toSql = "";

  for (const key in all) {
    if (all[key] !== null) toSql += `${key}= "${all[key]}",`;
  }

  if (!toSql) return "You cannot enter empty values";

  toSql = toSql.slice(0, -1);
  //   return toSql;
  try {
    const sql = `
        UPDATE halls
        SET ${toSql}
        WHERE id_hall = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [id_hall]);
    if (affectedRows) return "updated setting";
    return "not update";
  } catch (error) {
    return error.message;
  }
};

module.exports = { getHalls, putSetting, getHallsForDate, getSettings };
