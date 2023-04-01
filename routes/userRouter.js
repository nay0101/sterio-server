const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController");

router.get("/", user.getAllUsers);
router.get("/getadmins", user.getAllAdmins);
router.get("/:user_id", user.getOneUser);
router.put("/:user_id", user.updateUser);
router.delete("/:user_id", user.deleteUser);

module.exports = router;
