const jwt = require("jsonwebtoken");
const {
  generateAndSendAuthTokens,
} = require("../utils/generateAndSendAuthTokens");

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";

const authentication = (req, res, next) => {
  try {
    const accessToken = req.cookies.accesstoken;
    jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        // check for refresh token when access token is invalid
        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) return res.status(401).json(authError);
        jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (err, user) => {
          // if refresh token is invalid deny access
          if (err) return res.status(401).json(authError);
          // renew both tokens
          generateAndSendAuthTokens(res, user.userId, user.isAdmin);
          req.user = user;
          next();
        });
      } else {
        req.user = user;
        next();
      }
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
