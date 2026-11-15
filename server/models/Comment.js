const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    legend: { type: mongoose.Schema.Types.ObjectId, ref: "Legend", required: true, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: {
      type: String,
      required: [true, "Коментарът не може да е празен"],
      trim: true,
      minlength: [2, "Коментарът е твърде кратък"],
      maxlength: [1000, "Коментарът може да е най-много 1000 символа"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Comment", commentSchema);