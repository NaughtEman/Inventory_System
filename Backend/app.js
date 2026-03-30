const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./mongoURI.env" });

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// ROUTES
app.use("/products", require("./routes/productRoutes"));
app.use("/sales", require("./routes/salesRoutes"));
app.use("/reports", require("./routes/reportRoutes"));
app.use("/department", require("./routes/departmentRoutes"));
app.use("/inventory-logs", require("./routes/inventoryLogRoutes"));

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// START SERVER
app.listen(3000, () => console.log("Server running"));
