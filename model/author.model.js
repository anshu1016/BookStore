const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: [{ type:Number, ref: "Book" }],
});

const AuthorModel = mongoose.model("Author", authorSchema);

module.exports = AuthorModel;
