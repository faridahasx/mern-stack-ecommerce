const jwt = require("jsonwebtoken");

const createResetPasswordToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  createResetPasswordToken,
  createAccessToken,
  createRefreshToken,
};
