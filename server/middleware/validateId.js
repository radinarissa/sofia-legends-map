const mongoose = require("mongoose");

function validateId(paramName) {
  return (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params[paramName])) {
      return res.status(400).json({ message: "Невалиден идентификатор" });
    }
    next();
  };
}

module.exports = validateId;