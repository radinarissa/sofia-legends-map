const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Легендите на София API работи" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сървърът работи на http://localhost:${PORT}`);
});