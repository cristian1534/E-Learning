const express = require("express");
const router = express();
const { create, get, deleteOne } = require("../controllers/contact/contac");

router.post("/", create);
router.get("/", get);
router.delete("/:id", deleteOne);

module.exports = router;
