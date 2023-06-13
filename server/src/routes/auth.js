const { create } = require("../controllers/auth/register");
const { login } = require("../controllers/auth/login");
const express = require("express")
const router = express.Router();

router.post("/register", create);
router.post("/login", login)


module.exports = router;