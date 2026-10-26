function notFound(req, res) {
  res.status(404).json({ message: `Няма такъв адрес: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Невалидни данни",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }
  
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Невалиден идентификатор" });
  }
  
  if (err.code === 11000) {
    return res.status(409).json({ message: "Такъв запис вече съществува" });
  }

  res.status(err.status || 500).json({
    message: err.status ? err.message : "Възникна грешка на сървъра",
  });
}

module.exports = { notFound, errorHandler };