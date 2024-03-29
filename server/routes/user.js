const router = require("express").Router();
const { authentication } = require("../middleware/authVerify");
const User = require("../models/User");
const Address = require("../models/Address");
const CartItem = require("../models/CartItem");
const {
  UPDATE_SUCCESS,
  INVALID_CREDENTIALS,
  DELETE_SUCCESS,
  USER_NOT_FOUND,
  SAVED_ADDRESS,
} = require("../responseMessages");

// Get user
router.get("/info", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update user
router.patch("/", authentication, async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOneAndUpdate({ _id: req.user.userId }, { email });
    res.json(UPDATE_SUCCESS);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete user
router.delete("/delete", authentication, async (req, res) => {
  try {
    // Verify password
    const { password } = req.body;
    const user = await User.findOne({ _id: req.user.userId });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (userPassword !== password)
      return res.status(401).json(INVALID_CREDENTIALS);
    // Delete user
    await User.findOneAndDelete({ _id: req.user.userId });
    await CartItem.deleteMany({ user: req.user.userId });
    await Address.findOneAndDelete({ userId: req.user.userId });
    res.status(201).json(DELETE_SUCCESS);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get user address
router.get("/address", authentication, async (req, res) => {
  try {
    const address = await Address.findOne({ userID: req.user.userId });
    if (!address) return res.status(400).json(USER_NOT_FOUND);
    res.json(address);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update user address
router.patch("/address", authentication, async (req, res) => {
  try {
    await Address.findOneAndUpdate({ userID: req.user.userId }, req.body);
    res.json(SAVED_ADDRESS);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
