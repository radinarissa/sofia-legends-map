const express = require("express");
const Legend = require("../models/Legend");
const { STATUSES } = require("../constants");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/legends", async (req, res, next) => {
  try {
    const status = req.query.status ? String(req.query.status) : "pending";
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: `Невалиден статус. Позволени: ${STATUSES.join(", ")}` });
    }

    const legends = await Legend.find({ status })
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .select("-__v");

    res.json(legends);
  } catch (err) {
    next(err);
  }
});

router.put("/legends/:id/status", validateId("id"), async (req, res, next) => {
  try {
    const { status, reason } = req.body ?? {};

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({ message: "Статусът трябва да е approved или rejected" });
    }
    if (status === "rejected" && String(reason ?? "").trim().length < 5) {
      return res.status(400).json({ message: "Напишете причина за отказа (поне 5 символа)" });
    }

    const legend = await Legend.findById(req.params.id);
    if (!legend) {
      return res.status(404).json({ message: "Легендата не е намерена" });
    }

    legend.status = status;
    legend.rejectionReason = status === "rejected" ? String(reason).trim() : undefined;
    await legend.save();

    res.json(legend);
  } catch (err) {
    next(err);
  }
});

module.exports = router;