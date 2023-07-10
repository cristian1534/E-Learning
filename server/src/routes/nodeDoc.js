const express = require("express");
const router = express.Router();
const { nodeDoc } = require("../controllers/material/doc");

router.get("/get", nodeDoc);

module.exports = router;
