require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

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