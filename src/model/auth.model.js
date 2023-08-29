const db = require("../database/gateway.config");

login = async (nik, password) =>
  await db.select(
    db.raw(
      `a.id
        ,a.role_id
        ,a.nik AS nik
        ,a.NAME AS name
        ,a.photo AS photo
        ,b.role_name AS role_name
        ,b.detail AS role_detail
    FROM mst_user a
    LEFT JOIN mst_user_role b ON (a.role_id = b.id)
    WHERE a.nik = '${nik}'
        AND a.password = '${password}'
    GROUP BY a.nik`
    )
  );

module.exports = {login}