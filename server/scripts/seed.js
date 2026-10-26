require("dotenv").config();
const mongoose = require("mongoose");
const Legend = require("../models/Legend");
const legends = require("../data/legends.json");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Свързан с MongoDB");

    await Legend.deleteMany({});
    console.log("Старите легенди са изтрити");

    const docs = legends.map((legend) => ({ ...legend, status: "approved" }));
    await Legend.insertMany(docs);

    console.log(`Заредени са ${docs.length} легенди`);
  } catch (err) {
    console.error("Грешка при зареждане:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();