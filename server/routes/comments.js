const express = require("express");
const Comment = require("../models/Comment");
const Legend = require("../models/Legend");
const { requireAuth } = require("../middleware/auth");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/legends/:legendId/comments", validateId("legendId"), async (req, res, next) => {
  try {
    const comments = await Comment.find({ legend: req.params.legendId })
      .sort({ createdAt: -1 })
      .populate("author", "name"); 

    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/legends/:legendId/comments", requireAuth, validateId("legendId"), async (req, res, next) => {
  try {
    const legend = await Legend.findOne({ _id: req.params.legendId, status: "approved" });
    if (!legend) {
      return res.status(404).json({ message: "Легендата не е намерена" });
    }

    const comment = await Comment.create({
      legend: legend._id,
      author: req.user.id, 
      text: String(req.body?.text ?? ""),
    });
    await comment.populate("author", "name");

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

router.put("/comments/:id", requireAuth, validateId("id"), async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Коментарът не е намерен" });
    }
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Можете да редактирате само своите коментари" });
    }

    comment.text = String(req.body?.text ?? "");
    await comment.save(); 
    await comment.populate("author", "name");

    res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.delete("/comments/:id", requireAuth, validateId("id"), async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Коментарът не е намерен" });
    }

    const isAuthor = comment.author.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: "Можете да изтривате само своите коментари" });
    }

    await comment.deleteOne();
    res.status(204).end(); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;