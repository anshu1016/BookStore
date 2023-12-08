const ShoppingCartModel = require("../model/cart.model.js");

const getShoppingCart = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the shopping cart for the user
    const shoppingCart = await ShoppingCartModel.findOne({ user: userId }).populate({
      path: 'items.book',
      model: 'Book',
    });

    if (!shoppingCart) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }

    res.status(200).json({ message: 'Shopping cart fetched successfully', shoppingCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error in fetching shopping cart', err: err });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId, quantity } = req.body;

    // Find the shopping cart for the user
    let shoppingCart = await ShoppingCartModel.findOne({ user: userId });

    // If the shopping cart doesn't exist, create a new one
    if (!shoppingCart) {
      shoppingCart = new ShoppingCartModel({ user: userId, items: [] });
    }

    // Check if the book is already in the cart
    const existingItem = shoppingCart.items.find(item => item.book.toString() === bookId);

    if (existingItem) {
      // If the book is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the book is not in the cart, add a new item
      shoppingCart.items.push({ book: bookId, quantity });
    }

    // Update the total price
    shoppingCart.total = shoppingCart.items.reduce((total, item) => {
      const bookPrice = item.book.price || 0; // Assuming each book has a 'price' property
      return total + bookPrice * item.quantity;
    }, 0);

    // Save the shopping cart
    await shoppingCart.save();

    res.status(200).json({ message: 'Item added to the shopping cart successfully', shoppingCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error in adding to the shopping cart', err: err });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;

    // Find the shopping cart for the user
    const shoppingCart = await ShoppingCartModel.findOne({ user: userId });

    if (!shoppingCart) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }

    // Remove the item from the cart
    shoppingCart.items = shoppingCart.items.filter(item => item.book.toString() !== bookId);

    // Update the total price
    shoppingCart.total = shoppingCart.items.reduce((total, item) => {
      const bookPrice = item.book.price || 0;
      return total + bookPrice * item.quantity;
    }, 0);

    // Save the shopping cart
    await shoppingCart.save();

    res.status(200).json({ message: 'Item removed from the shopping cart successfully', shoppingCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error in removing from the shopping cart', err: err });
  }
};

module.exports = { getShoppingCart, addToCart, removeFromCart };
