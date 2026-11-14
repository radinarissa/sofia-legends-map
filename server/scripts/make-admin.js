require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function makeAdmin() {
  const email = process.argv[2];
  if (!email) {
    console.error("Използване: node scripts/make-admin.js имейл@пример.bg");
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await User.updateOne({ email: email.toLowerCase().trim() }, { $set: { role: "admin" } });

    if (result.matchedCount === 0) {
      console.error(`Няма потребител с имейл ${email}`);
      process.exitCode = 1;
    } else {
      console.log(`${email} вече е администратор. Нужно е да излезе и да влезе отново.`);
    }
  } catch (err) {
    console.error("Грешка:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

makeAdmin();