const { pool } = require('./dbConnection')

const getSumOrdersMonth  = async (name) => {
    try {
        const sql = `
        SELECT 
        DATE_FORMAT(date, "%Y-%m") as 'date' ,
       SUM(o.total_payment) 'sum_total_payments',
       COUNT(id) AS 'sum_orders'
      FROM events_schedule es 
      left join orders o
      using(date) 
      where es.id_hall  IN (
                  select mh.id_hall from managers_halls mh
                  join users u
                  USING(id_user)
                  WHERE u.name = ?
                  )
      GROUP BY DATE_FORMAT(es.date, "%Y-%m")
       order by DATE_FORMAT(es.date, "%Y-%m") DESC;
        `
        const [res] = await pool.query(sql, [name]);
        return res;
    } catch (error) {
        return error.message
    }
}
module.exports ={getSumOrdersMonth}