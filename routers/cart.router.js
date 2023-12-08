const express = require("express");
const cartRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  getShoppingCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller.js");

// Get shopping cart
cartRouter.get("/", authMiddleware, getShoppingCart);

// Add to shopping cart
  cartRouter.post("/add", authMiddleware, addToCart);

// Remove from shopping cart
  cartRouter.delete("/remove/:bookId", authMiddleware, removeFromCart);

module.exports = cartRouter;
