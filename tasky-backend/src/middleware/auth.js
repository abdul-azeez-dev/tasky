// Auth middleware
// next() will be called only if user is authorized
// otherwise error response will be sent
require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["x-auth"];
  if (!token) res.status(401).json({ msg: "Auth failed" });
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

module.exports = auth;
