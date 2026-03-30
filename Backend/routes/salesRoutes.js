const router = require("express").Router();
const controller = require("../controllers/salesControllers");

router.post("/", controller.createSale);

module.exports = router;