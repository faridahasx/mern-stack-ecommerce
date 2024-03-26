const router = require("express").Router();
const cloudinary = require("cloudinary");
const { authentication, authorization } = require("../middleware/authVerify");
const QueryFeatures = require("../utils/productsQuery");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");
const {
  EMPTY_IMAGE,
  PRODUCT_CREATED,
  PRODUCT_NOT_FOUND,
  DUPLICATE_TITLES,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
} = require("../responseMessages");

// Get products
router.get("/", async (req, res) => {
  try {
    const productsQuery = new QueryFeatures(Product.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await productsQuery.databaseQuery;

    res.status(200).json({
      length: products.length,
      products: products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add product
router.post("/", authentication, authorization, async (req, res) => {
  try {
    if (!req.body.images) return res.status(400).json(EMPTY_IMAGE);
    const product = await Product.findOne({ title: req.body.title });
    if (product) return res.status(400).json();

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json(PRODUCT_CREATED);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    if (!product) return res.status(404).json(PRODUCT_NOT_FOUND);
    res.status(200).json(product);
  } catch (err) {
    return res.status(404).json(PRODUCT_NOT_FOUND);
  }
});

// Update Product
router.put("/:id", authentication, authorization, async (req, res) => {
  try {
    const product = await Product.findOne({ title: req.body.title });
    if (product && product.id !== req.params.id)
      return res.status(400).json(DUPLICATE_TITLES);
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(PRODUCT_UPDATED);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete product
router.delete("/:id", authentication, authorization, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json(PRODUCT_NOT_FOUND);
    const { title, images } = product;
    images.forEach(async (img) => {
      await cloudinary.v2.uploader.destroy(
        img.public_id,
        async (err, result) => {
          if (err) throw err;
        }
      );
    });
    await Product.findOneAndDelete({ title: title });
    await CartItem.deleteMany({ product: req.params.id });
    res.status(200).json(PRODUCT_DELETED);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
