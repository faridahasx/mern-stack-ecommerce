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
const {
  FILL_REQUIRED_FIELDS,
  INVALID_EMAIL,
  DUPLICATE_EMAIL,
  REGISTER_SUCCESS,
  INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
} = require("../responseMessages");

const { CLIENT_URL } = process.env;

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json(FILL_REQUIRED_FIELDS);
    if (!validateEmail(email)) return res.status(400).json(INVALID_EMAIL);

    const user = await User.findOne({ email });
    if (user) return res.status(400).json(DUPLICATE_EMAIL);

    if (password.length < 8)
      return res.status(400).json("Password must be at least 8 characters");

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

    res.status(200).json(REGISTER_SUCCESS);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json(INVALID_CREDENTIALS);
    // Verify password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (userPassword !== password)
      return res.status(401).json(INVALID_CREDENTIALS);

    generateAndSendAuthTokens(res, user._id, user.isAdmin);
    res.status(200).json(LOGIN_SUCCESS);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "api/user/refresh_token" });
    return res.json("Logged Out");
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
    res.status(200).json(LOGIN_SUCCESS);
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
