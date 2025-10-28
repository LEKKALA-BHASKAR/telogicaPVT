import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE PRODUCT (POST) */
/* -------------------------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      stock,
      images,
      pdfs,
      specifications,
      featured,
    } = req.body;

    const newProduct = new Product({
      title,
      description,
      category,
      price,
      stock,
      images,
      pdfs,
      specifications,
      featured,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟡 GET ALL PRODUCTS + Filters + Sort (Already Present) */
/* -------------------------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    let query = {};

    // Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sort
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    else if (sort === "price_desc") sortOption.price = -1;
    else if (sort === "newest") sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(query).sort(sortOption);

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🔵 GET SINGLE PRODUCT */
/* -------------------------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🟠 UPDATE PRODUCT (PUT) */
/* -------------------------------------------------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🔴 DELETE PRODUCT */
/* -------------------------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 🛒 CART ROUTES (Already Present Below) */
/* -------------------------------------------------------------------------- */

// Get cart
router.get("/cart/items", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to cart
router.post("/cart/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    if (product.stock < quantity)
      return res.status(400).json({ success: false, message: "Insufficient stock" });

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) existingItem.quantity += quantity;
    else user.cart.push({ product: productId, quantity });

    await user.save();
    await user.populate("cart.product");

    res.json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update cart
router.put("/cart/update", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem)
      return res.status(404).json({ success: false, message: "Item not in cart" });

    const product = await Product.findById(productId);
    if (product.stock < quantity)
      return res.status(400).json({ success: false, message: "Insufficient stock" });

    cartItem.quantity = quantity;
    await user.save();
    await user.populate("cart.product");

    res.json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from cart
router.delete("/cart/remove/:productId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await user.save();
    await user.populate("cart.product");
    res.json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear cart
router.delete("/cart/clear", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
