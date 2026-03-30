const Sale = require("../models/Sale");

exports.getSalesSummary = async (req, res) => {
  try {
    const summary = await Sale.aggregate([
      {
        $group: {
          _id: "$productId",
          totalRevenue: { $sum: "$totalPrice" },
          totalSold: { $sum: "$quantity" }
        }
      }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};