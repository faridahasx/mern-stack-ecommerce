const { createRefreshToken, createAccessToken } = require("./createToken");

const generateAndSendAuthTokens = (res, userID, isAdmin) => {
  // Create tokens
  const refreshToken = createRefreshToken({
    userId: userID,
    isAdmin: isAdmin,
  });
  const accessToken = createAccessToken({
    userId: userID,
    isAdmin: isAdmin,
  });
  // Set cookies
  res.cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

module.exports = { generateAndSendAuthTokens };
