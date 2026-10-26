const express = require("express");
const Legend = require("../models/Legend");
const { CATEGORIES, ERAS, CREDIBILITY } = require("../constants");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = { status: "approved" };

    const listFilters = [
      ["category", CATEGORIES],
      ["era", ERAS],
      ["credibility", CREDIBILITY],
    ];
    for (const [field, allowed] of listFilters) {
      if (req.query[field]) {
        const values = String(req.query[field]).split(",");
        const invalid = values.filter((v) => !allowed.includes(v));
        if (invalid.length > 0) {
          return res.status(400).json({
            message: `Невалидна стойност за ${field}: ${invalid.join(", ")}. Позволени: ${allowed.join(", ")}`,
          });
        }
        filter[field] = { $in: values };
      }
    }
    if (req.query.district) {
      filter.district = String(req.query.district);
    }

    const { minScary, maxScary } = req.query;
    if (minScary || maxScary) {
      const min = minScary ? Number(minScary) : 1;
      const max = maxScary ? Number(maxScary) : 5;
      if (Number.isNaN(min) || Number.isNaN(max)) {
        return res.status(400).json({ message: "minScary и maxScary трябва да са числа от 1 до 5" });
      }
      filter.scariness = { $gte: min, $lte: max };
    }

    if (req.query.q) {
      const safe = String(req.query.q).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(safe, "i");
      filter.$or = [{ title: regex }, { shortDescription: regex }, { address: regex }];
    }

    const legends = await Legend.find(filter)
      .select("-fullStory -sources -__v") 
      .collation({ locale: "bg" }) 
      .sort({ title: 1 });

    res.json(legends);
  } catch (err) {
    next(err);
  }
});

router.get("/districts", async (req, res, next) => {
  try {
    const districts = await Legend.distinct("district", { status: "approved" });
    res.json(districts.sort((a, b) => a.localeCompare(b, "bg")));
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const legend = await Legend.findOne({ slug: req.params.slug, status: "approved" }).select("-__v");

    if (!legend) {
      return res.status(404).json({ message: "Легендата не е намерена" });
    }
    res.json(legend);
  } catch (err) {
    next(err);
  }
});

module.exports = router;