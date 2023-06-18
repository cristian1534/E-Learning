const { getOne, get, update, deleteOne } = require("../controllers/user/user");

const express = require("express");
const router = express.Router();

router.get("/:id", getOne);
router.get("/", get);
router.patch("/:id", update);
router.delete("/api/user/:id", deleteOne )

module.exports = router;
