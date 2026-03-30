const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

// Create New Product
router.post("/", controller.createProduct);

// Get all Products
router.get("/", controller.getProducts);

//Get product by id
router.get("/:id", controller.getProductById);

// update product
router.patch("/:id", controller.updateProduct);

//delete product by id
router.delete("/:id", controller.deleteProduct)

module.exports = router;