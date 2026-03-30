const Product = require("../models/Product");
const Sale = require("../models/Sale");

exports.createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ error: "Product not found" });

    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than 0" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    // Update stock
    product.quantity -= quantity;
    await product.save();

    const sale = await Sale.create({
      productId,
      quantity,
      totalPrice: quantity * product.price
    });

    res.json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};