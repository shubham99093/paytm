const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);

    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    return res.status(403).json({ message: "ee" });
  }
};

module.exports = {
  authMiddleware,
};
