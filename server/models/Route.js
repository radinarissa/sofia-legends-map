const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "slug може да съдържа само малки латински букви, цифри и тирета"],
    },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    travelMode: { type: String, enum: ["walking", "transit"], default: "walking" },
    durationMinutes: { type: Number, required: true, min: 10, max: 720 },
    bestTime: { type: String, trim: true },
    legends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Legend" }],
      validate: [(list) => list.length >= 2, "Маршрутът трябва да има поне 2 легенди"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Route", routeSchema);