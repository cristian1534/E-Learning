const express = require("express");
const router = express.Router();
const { reactVideos } = require("../controllers/tutorial/react");
const { nodeVideos } = require("../controllers/tutorial/node");



router.get("/react", reactVideos);
router.get("/node", nodeVideos);

module.exports = router;