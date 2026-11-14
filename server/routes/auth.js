const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

function createToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Попълнете име, имейл и парола" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Вече има профил с този имейл" });
    }

    const user = await User.create({ name: String(name), email: normalizedEmail, password: String(password) });
    res.status(201).json({ token: createToken(user), user });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ message: "Въведете имейл и парола" });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select("+password");
    const isCorrect = user && (await user.comparePassword(String(password)));

    if (!isCorrect) {
      return res.status(401).json({ message: "Грешен имейл или парола" });
    }

    res.json({ token: createToken(user), user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;