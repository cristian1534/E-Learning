const express = require("express");
const router = express.Router();
const { reduxDoc } = require("../controllers/material/doc");

router.get("/get", reduxDoc);

module.exports = router;
