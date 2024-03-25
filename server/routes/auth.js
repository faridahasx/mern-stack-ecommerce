const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const CryptoJS = require("crypto-js");
const validateEmail = require("../utils/validateEmail");
const sendEmail = require("../utils/sendEmail");
const {
  createResetPasswordToken,
  createAccessToken,
  createRefreshToken,
} = require("../utils/createToken");
const User = require("../models/User");
const Address = require("../models/Address");
const {
  generateAndSendAuthTokens,
} = require("../utils/generateAndSendAuthTokens");

const { CLIENT_URL } = process.env;

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json("Please fill in all fields.");
    if (!validateEmail(email)) return res.status(400).json("Invalid email");

    const user = await User.findOne({ email });
    if (user) return res.status(400).json("This email already exists.");

    if (password.length < 8)
      return res.status(400).json("Password must be at least 8 characters.");

    // Create user
    const newUser = new User({
      email: req.body.email.toLowerCase(),
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString(),
    });
    await newUser.save();
    const newUserAddress = new Address({
      userID: newUser._id,
    });
    await newUserAddress.save();

    generateAndSendAuthTokens(res, newUser._id, newUser.isAdmin);

    res.status(200).json("Register Success!");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Wrong credentials");
    // Verify password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (userPassword !== password)
      return res.status(401).json("Wrong credentials");

    generateAndSendAuthTokens(res, user._id, user.isAdmin);
    res.status(200).json("Login Success!");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Email does not exit.");
    // Create and send access token
    const accessToken = createResetPasswordToken({ id: user._id });
    const url = `${CLIENT_URL}/reset-password/${accessToken}`;
    sendEmail(email, url, "Reset Password");
    res.json("Please check your email for the reset link.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    if (password.length < 8)
      return res.status(400).json("Password must be at least 8 characters.");

    const resetPasswordToken = req.params.token;
    const user = jwt.verify(
      resetPasswordToken,
      process.env.JWT_RESET_PASSWORD_REFRESH_TOKEN_SECRET
    );
    if (!user) return res.status(400).json("Invalid token.");

    const { id } = user;
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString();
    await User.findOneAndUpdate(id, {
      password: hashedPassword,
    });
    res.json("Password has been changed successfully!");
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(500).json("Invalid token, please request a new one.");
    }
    return res.status(500).json(err);
  }
});

// Logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "api/user/refresh_token" });
    return res.json("Logged out.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Login Failed
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed login attempt.",
  });
});

// Login Success
router.get("/login/success", (req, res) => {
  if (req.user) {
    const refresh_token = createRefreshToken({ id: req.user._id });
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json("Login success!");
  }
});

// Google OAuth2
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login/failed",
  }),
  async (req, res) => {
    if (req.user) {
      generateAndSendAuthTokens(res, req.user._id, req.user.isAdmin);
      res.redirect(CLIENT_URL + "/login-success");
    }
  }
);

module.exports = router;
