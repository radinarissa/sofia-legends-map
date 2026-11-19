const express = require("express");
const Route = require("../models/Route");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const routes = await Route.find()
      .collation({ locale: "bg" })
      .sort({ title: 1 })
      .populate({
        path: "legends",
        match: { status: "approved" }, 
        select: "slug title lat lng category district scariness",
      });

    res.json(routes);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const route = await Route.findOne({ slug: req.params.slug }).populate({
      path: "legends",
      match: { status: "approved" },
      select: "-fullStory -sources -__v",
    });

    if (!route) {
      return res.status(404).json({ message: "Маршрутът не е намерен" });
    }
    res.json(route);
  } catch (err) {
    next(err);
  }
});

module.exports = router;