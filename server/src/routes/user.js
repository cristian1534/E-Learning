const { getOne } = require("../controllers/user/user");

const express = require("express");
const router = express.Router();

router.get("/:id", getOne);

module.exports = router;