const express = require("express");
const cors = require("cors");
const app = express();

app.set("trust proxy", 1);

const categoryRoutes = require("./routes/categoryRoutes");
const groupRoutes = require("./routes/groupRoutes");
const valueRoutes = require("./routes/valueRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/values", valueRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});