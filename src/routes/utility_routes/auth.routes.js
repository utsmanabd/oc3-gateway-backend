var express = require('express');
var router = express.Router();
const AuthController = require('../../controller/auth_controller/AuthController')

// auth
router.post('/login', AuthController.login);
router.post('/update-token', AuthController.refreshToken)


module.exports = router;