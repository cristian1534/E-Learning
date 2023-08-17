const express = require("express");
const router = express.Router();
const { testFrontDoc, testBackDoc } = require("../controllers/material/doc");

router.get("/get-front", testFrontDoc);
router.get("/get-back", testBackDoc);

module.exports = router;
