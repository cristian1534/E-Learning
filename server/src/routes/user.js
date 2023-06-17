const { getOne, get } = require("../controllers/user/user");

const express = require("express");
const router = express.Router();

router.get("/:id", getOne);
router.get("/", get);

module.exports = router;
