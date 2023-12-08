const mongoose = require("mongoose");
const { Schema } = mongoose;
const shoppingCartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "UserAuth", unique: true },
  items: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book" },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

const ShoppingCartModel = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCartModel;
