const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Името е задължително"],
      trim: true,
      minlength: [2, "Името трябва да е поне 2 символа"],
      maxlength: [50, "Името може да е най-много 50 символа"],
    },
    email: {
      type: String,
      required: [true, "Имейлът е задължителен"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Невалиден имейл адрес"],
    },
    password: {
      type: String,
      required: [true, "Паролата е задължителна"],
      minlength: [8, "Паролата трябва да е поне 8 символа"],
      select: false, 
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Legend" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);