require("dotenv").config();
const mongoose = require("mongoose");
const Route = require("../models/Route");
const Legend = require("../models/Legend");
const routes = require("../data/routes.json");

async function seedRoutes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Свързан с MongoDB");

    const docs = [];
    for (const route of routes) {
      const legends = await Legend.find({ slug: { $in: route.legends }, status: "approved" }).select("_id slug");
      const idBySlug = new Map(legends.map((legend) => [legend.slug, legend._id]));

      const missing = route.legends.filter((slug) => !idBySlug.has(slug));
      if (missing.length > 0) {
        throw new Error(`Маршрут "${route.slug}": няма одобрени легенди ${missing.join(", ")}`);
      }

      docs.push({ ...route, legends: route.legends.map((slug) => idBySlug.get(slug)) });
    }

    await Route.deleteMany({});
    await Route.insertMany(docs);
    console.log(`Заредени са ${docs.length} маршрута`);
  } catch (err) {
    console.error("Грешка при зареждане на маршрутите:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedRoutes();