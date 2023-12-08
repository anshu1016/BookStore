const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  shoppingCart: { type: Schema.Types.ObjectId, ref: "ShoppingCart" },
});

const UserModel = mongoose.model("UserAuth", authSchema);

module.exports = UserModel;
