const router = require("express").Router();

const adminController = require('../controller/admin/adminController')

router.get("/users",adminController.getAllUser);
router.post("/edit",adminController.editUser);
router.delete("/delete",adminController.deleteUser);
router.get("/email",adminController.deleteUser);


module.exports = router