const express = require("express");
const router = express.Router();
const { getHistory } = require("../controllers/inventoryLogController");

//Get history
router.get("/", getHistory);

module.exports = router;