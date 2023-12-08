const bookModel = require("../model/books.model.js");
const UserModel = require("../model/auth.model.js");
const AuthorModel = require("../model/author.model.js");
const { Types,mongoose } =require("mongoose");



const getBooksByAuthor = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    // Find the user by ID
    const user = await UserModel.findById(req.userId).populate('books');

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter books by the specified author ID
    const booksByAuthor = user.books.filter(book => book.author.toString() === authorId);

    res.status(200).json({ message: 'Books by author fetched successfully', books: booksByAuthor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error in fetching books by author', err: err });
  }
};

module.exports = { getBooksByAuthor };


module.exports = { getBooksByAuthor };







module.exports = { getBooksByAuthor };


