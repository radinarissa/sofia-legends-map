require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const legendRoutes = require("./routes/legends");
const authRoutes = require("./routes/auth");
const { notFound, errorHandler } = require("./middleware/errorHandler");

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("Липсва MONGODB_URI или JWT_SECRET в server/.env");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/legends", legendRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Свързан с MongoDB");
    app.listen(PORT, () => {
      console.log(`Сървърът работи на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Грешка при свързване с MongoDB:", err.message);
    process.exit(1);
  });