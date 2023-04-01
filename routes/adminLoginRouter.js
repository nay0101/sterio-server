const express = require("express");
const router = express.Router();
const login = require("../controllers/AdminLoginController");

router.post("/login", login.login);
router.post("/signup", login.signUp);
router.get("/logout", login.logout);

module.exports = router;
