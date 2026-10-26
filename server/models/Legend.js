const mongoose = require("mongoose");
const { CATEGORIES, ERAS, CREDIBILITY, STATUSES } = require("../constants");

const sourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    author: String,
    license: String,
  },
  { _id: false }
);

const legendSchema = new mongoose.Schema(
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
    shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
    fullStory: { type: String, required: true },
    address: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    lat: { type: Number, required: true, min: 42.4, max: 42.85 },
    lng: { type: Number, required: true, min: 23.1, max: 23.55 },
    category: { type: String, required: true, enum: CATEGORIES },
    era: { type: String, required: true, enum: ERAS },
    scariness: { type: Number, required: true, min: 1, max: 5 },
    credibility: { type: String, required: true, enum: CREDIBILITY },
    sources: {
      type: [sourceSchema],
      validate: [(list) => list.length > 0, "Нужен е поне един източник"],
    },
    images: [imageSchema],
    status: { type: String, enum: STATUSES, default: "pending" },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Legend", legendSchema);