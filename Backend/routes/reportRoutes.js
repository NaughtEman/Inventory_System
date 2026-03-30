const router = require("express").Router();
const controller = require("../controllers/reportControllers");

router.get("/", controller.getSalesSummary);

module.exports = router;