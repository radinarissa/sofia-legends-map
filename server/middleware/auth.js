const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Трябва да влезете в профила си" });
  }

  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role }; 
    next();
  } catch {
    return res.status(401).json({ message: "Сесията е изтекла. Влезте отново." });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Само администратор има достъп" });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };