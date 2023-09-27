const router = require("express").Router();

const userController = require('../controller/user/userController')
const multerUpload = require('../utils/multer')

router.get("/getuser", userController.getUser)
router.post("/image", multerUpload, userController.uploadImage)

module.exports = router