const jwt = require("jsonwebtoken");

function verifyToken(req) {
  const token = req.headers.authorization;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = verifyToken;
