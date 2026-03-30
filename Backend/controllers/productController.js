const Product = require("../../../models/Product");
const paginatedResults = require("../../pagination");
const InventoryLog = require("../../../models/InventoryLog");

// Create product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {

  try{

    const { department, productId, page, limit, sort } = req.query;
    const filter = {};

    if (department) {
      filter.department = department;
    }

    if (productId) {
      filter._id = productId;
    }

    let sortOption = { createdAt: -1 };

    if (sort === "name") {
      sortOption = { name: 1 };
    }

    if (sort === "price_asc") {
      sortOption = { price: 1 };
    }

    if (sort === "price_desc") {
      sortOption = { price: -1 };
    }

    const results = await paginatedResults({
      model: Product,
      page,
      limit,
      filter,
      sort: sortOption,
      populate: "department"
    });

    if (results.data.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(results);

  } catch (err) {
    res.status(400).json({error: err.message})
  }
  
};

// Get product by ID
exports.getProductById = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "This item doesn't exist" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({error: err.message})
  }
  
};

// delete product
exports.deleteProduct = async (req,res) => {

  try{
    const product = await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({ message: "Item not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    const previousQuantity = product.quantity || 0;
    const inventoryLog = await InventoryLog.create({
      product: product._id,
      changeType: "DISCONTINUED",
      quantityChanged: -previousQuantity,
      previousQuantity,
      newQuantity: 0,
      note: req.body.note || "Product discontinued"
    });

    res.status(200).json({
      message: `${product.name} deleted successfully`,
      inventoryLog
    });

  }catch (err){
    res.status(400).json({error: err.message})
  }
  

};

// Update stock
exports.updateProduct = async (req, res) => {
  try {
    const allowedUpdates = ["name", "price", "quantity", "department", "unit"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const previousQuantity = product.quantity;

    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    await product.save();

    let inventoryLog = null;

    if (updates.quantity !== undefined && updates.quantity !== previousQuantity) {
      const newQuantity = product.quantity;
      const quantityChanged = newQuantity - previousQuantity;

      let changeType = "ADJUSTMENT";

      if (quantityChanged > 0) {
        changeType = "RESTOCK";
      } else if (quantityChanged < 0) {
        changeType = "SALE";
      }

      inventoryLog = await InventoryLog.create({
        product: product._id,
        changeType,
        quantityChanged,
        previousQuantity,
        newQuantity,
        note: req.body.note || ""
      });
    }

    res.json({
      message: "Product updated successfully",
      updatedFields: Object.keys(updates),
      product,
      inventoryLog
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};