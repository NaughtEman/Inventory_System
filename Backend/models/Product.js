const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  unit: {type: String, required: false},
  location:{type: String, required: false},
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: false },
  lowStockThreshold: { type: Number, default: 0, required: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);