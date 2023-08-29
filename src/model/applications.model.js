const gateway = require("../database/gateway.config");

getAll = async () =>
  await gateway.select("*").from("applications").where("is_active", 1);
getById = async (id) =>
  await gateway.select("*").from("applications").where("app_id", id);
insert = async (data) => await gateway("applications").insert(data);
update = async (id, data) =>
  await gateway("applications").where("app_id", id).update(data);
deleteData = async (id) =>
  await gateway("applications").where("app_id", id).del();

getCustomApps = async (userId) =>
  await gateway.select(
    gateway.raw(
      `a.*, uc.id AS custom_id FROM applications AS a LEFT JOIN user_app_customizations AS uc ON a.app_id = uc.app_id AND uc.user_id = ${userId} ORDER BY COALESCE(uc.custom_order, a.app_id)`
    )
  );

insertCustomApp = async (data) => await gateway("user_app_customizations").insert(data)
deleteCustomApp = async (id) => await gateway("user_app_customizations").where("id", id).del()

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteData,
  getCustomApps,
  insertCustomApp,
  deleteCustomApp
};
