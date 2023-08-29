var express = require('express');
var router = express.Router();

const ApplicationController = require('../../controller/master_controller/ApplicationController');
const { uploadImage } = require('../../services/file-handler.service');
const ImageHandler = require('../../controller/master_controller/ImageHandlerController')

// Image Upload
router.post('/image', uploadImage.single('file'), ImageHandler.uploadImage)
router.delete('/image/:filename', ImageHandler.deleteImage)

// Application data
router.get('/user-app/:id', ApplicationController.getCustomApps)
router.get('/application', ApplicationController.getAllApps);
router.get('/application/:id', ApplicationController.getAppById);
router.post('/application', ApplicationController.insertApp);
router.post('/user-app', ApplicationController.insertCustomApp)
router.put('/application/:id', ApplicationController.updateApp)
router.delete('/application/:id', ApplicationController.deleteApp)
router.delete('/user-app/:id', ApplicationController.deleteCustomApp)

module.exports = router;