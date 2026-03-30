const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    changeType: {
      type: String,
      enum: ["RESTOCK", "SALE", "ADJUSTMENT", "SHRINK", "DISCONTINUED"],
      required: true
    },
    quantityChanged: {
      type: Number,
      required: false
    },
    previousQuantity: {
      type: Number,
      required: false
    },
    newQuantity: {
      type: Number,
      required: false
    },
    note: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);