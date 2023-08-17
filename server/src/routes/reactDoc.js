const express = require("express");
const router = express.Router();
const { reactDoc } = require("../controllers/material/doc");

router.get("/get", reactDoc);

module.exports = router;
