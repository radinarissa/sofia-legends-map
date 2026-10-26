const express = require("express");
const Legend = require("../models/Legend");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const legends = await Legend.find({ status: "approved" })
      .select("-fullStory -sources -__v")
      .collation({ locale: "bg" }) 
      .sort({ title: 1 });

    res.json(legends);
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