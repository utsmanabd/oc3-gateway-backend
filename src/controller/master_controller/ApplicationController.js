const model = require('../../model/applications.model')
const api = require('../../tools/common')

getAppById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllApps = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

insertApp = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateApp = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteApp = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteData(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

getCustomApps = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getCustomApps(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

insertCustomApp = async (req, res) => {
    let data = await model.insertCustomApp(req.body.form_data);
    return api.ok(res, data);
}

deleteCustomApp = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteCustomApp(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAppById,
    getAllApps,
    insertApp,
    updateApp,
    deleteApp,
    getCustomApps,
    insertCustomApp,
    deleteCustomApp
};