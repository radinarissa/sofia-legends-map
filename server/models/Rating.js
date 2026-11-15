const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    legend: { type: mongoose.Schema.Types.ObjectId, ref: "Legend", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true, versionKey: false }
);

ratingSchema.index({ legend: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Rating", ratingSchema);