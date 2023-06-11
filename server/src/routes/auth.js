const { create } = require("../controllers/auth/register");
const express = require("express")
const router = express.Router();

router.post("/register", create);


module.exports = router;