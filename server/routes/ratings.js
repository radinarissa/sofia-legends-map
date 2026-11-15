const express = require("express");
const Rating = require("../models/Rating");
const Legend = require("../models/Legend");
const { requireAuth } = require("../middleware/auth");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.put("/legends/:legendId/rating", requireAuth, validateId("legendId"), async (req, res, next) => {
  try {
    const value = Number(req.body?.value);
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      return res.status(400).json({ message: "Оценката трябва да е цяло число от 1 до 5" });
    }

    const legend = await Legend.findOne({ _id: req.params.legendId, status: "approved" });
    if (!legend) {
      return res.status(404).json({ message: "Легендата не е намерена" });
    }

    await Rating.updateOne({ legend: legend._id, user: req.user.id }, { $set: { value } }, { upsert: true });

    const [stats] = await Rating.aggregate([
      { $match: { legend: legend._id } },
      { $group: { _id: null, average: { $avg: "$value" }, count: { $sum: 1 } } },
    ]);
    const ratingAverage = stats ? Math.round(stats.average * 10) / 10 : 0; 
    const ratingCount = stats ? stats.count : 0;

    await Legend.updateOne({ _id: legend._id }, { $set: { ratingAverage, ratingCount } });

    res.json({ ratingAverage, ratingCount, myRating: value });
  } catch (err) {
    next(err);
  }
});

router.get("/legends/:legendId/rating/me", requireAuth, validateId("legendId"), async (req, res, next) => {
  try {
    const rating = await Rating.findOne({ legend: req.params.legendId, user: req.user.id });
    res.json({ value: rating ? rating.value : null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;