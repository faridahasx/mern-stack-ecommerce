const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json("Token is not valid!");
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const authorization = (req, res, next) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json("Not Authorized!");
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { authentication, authorization };
