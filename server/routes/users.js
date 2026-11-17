const express = require("express");
const User = require("../models/User");
const Legend = require("../models/Legend");
const { requireAuth } = require("../middleware/auth");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.use(requireAuth);

async function getFavoriteIds(userId) {
  const user = await User.findById(userId).select("favorites");
  return user ? user.favorites : [];
}

router.get("/me/favorites", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "favorites",
      match: { status: "approved" }, 
      select: "-fullStory -sources -__v",
    });
    if (!user) {
      return res.status(401).json({ message: "Профилът не съществува. Влезте отново." });
    }
    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
});

router.post("/me/favorites/:legendId", validateId("legendId"), async (req, res, next) => {
  try {
    const exists = await Legend.exists({ _id: req.params.legendId, status: "approved" });
    if (!exists) {
      return res.status(404).json({ message: "Легендата не е намерена" });
    }

    await User.updateOne({ _id: req.user.id }, { $addToSet: { favorites: req.params.legendId } });

    res.status(201).json({ favorites: await getFavoriteIds(req.user.id) });
  } catch (err) {
    next(err);
  }
});

router.delete("/me/favorites/:legendId", validateId("legendId"), async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user.id }, { $pull: { favorites: req.params.legendId } });

    res.json({ favorites: await getFavoriteIds(req.user.id) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;