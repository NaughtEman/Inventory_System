const InventoryLog = require("../../../models/InventoryLog");
const paginatedResults = require("../../pagination");

// Get history
exports.getHistory = async (req, res) => {
  try {

    const { product, changeType, page, limit, sort } = req.query;
    const filter = {};

    if(product){
      filter.product = product;
    }

    if(changeType){
      filter.changeType = changeType.toUpperCase();
    }

     let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const results = await paginatedResults({
      model: InventoryLog,
      page,
      limit,
      filter,
      sort: sortOption,
      populate: "product"
    });

    if (results.data.length === 0) {
      return res.status(404).json({ message: "No matching inventory history found" });
    }

    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};