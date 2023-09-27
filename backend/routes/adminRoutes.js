const router = require("express").Router();

const adminController = require('../controller/admin/adminController')

router.get("/users",adminController.getAllUser);


module.exports = router