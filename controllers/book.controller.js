const bookModel = require("../model/books.model.js");
const UserModel = require("../model/auth.model.js");




const getBook = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate("books");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const books = user.books; // Now, 'books' contains the complete book documents

    res.status(200).json({ message: "All books fetched", books: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in fetching books", err: err });
  }
};

const createBook = async (req, res) => {
  const { title, author, genre, description, coverImage } = req.body;

  try {
    // Create a new book
    const newBook = new bookModel({
      title: title,
      author: author,
      genre: genre,
      description: description,
      coverImage: coverImage,
    });

    // Save the book
    await newBook.save();

    // Find the user by ID and update the 'books' array
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { $push: { books: newBook._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Book Added Successfully",
      newBook: newBook,
      user: user,
    });
  } catch (err) {
    console.log(err, "Error in adding book");
    res.status(500).json({ message: "Error in adding book", err: err });
  }
};



const updateBook = async (req, res) => {
  const { title, author, genre, description, coverImage } = req.body;
  const bookId = req.params.ID;

  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      bookId,
      {
        title: title,
        author: author,
        genre: genre,
        description: description,
        coverImage: coverImage,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", updatedBook: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in updating book", err: err });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.ID;

  try {
    const deletedBook = await bookModel.findOneAndDelete({ _id: bookId });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Remove the book reference from the user's 'books' array
    await UserModel.findByIdAndUpdate(req.userId, { $pull: { books: bookId } });

    res.status(200).json({ message: "Book deleted successfully", deletedBook: deletedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in deleting book", err: err });
  }
};

const getSingleBook = async (req, res) => {
  const bookId = req.params.ID; // Assuming the bookId is passed as a route parameter

  try {
    const user = await UserModel.findById(req.userId).populate("books");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = user.books.find((book) => book._id.toString() === bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book fetched successfully", book: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in fetching book", err: err });
  }
};

const sortByGenre = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate("books");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the books before sorting
    console.log("Books before sorting:", user.books);

    // Ensure that 'user.books' is an array and not undefined
    if (!Array.isArray(user.books)) {
      console.error("Invalid books array:", user.books);
      return res.status(500).json({ message: "Invalid books array" });
    }

    // Sort books by genre and create a new array
    const sortedBooks = [...user.books].sort((a, b) => {
      console.log("Comparing genres:", a.genre, b.genre);
      return a.genre.localeCompare(b.genre);
    });

    // Log the books after sorting
    console.log("Books after sorting:", sortedBooks);

    res.status(200).json({ message: "Books sorted by genre", books: sortedBooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in sorting books by genre", err: err });
  }
};

const sortByTitle = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate("books");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the books before sorting
    console.log("Books before sorting:", user.books);

    // Ensure that 'user.books' is an array and not undefined
    if (!Array.isArray(user.books)) {
      console.error("Invalid books array:", user.books);
      return res.status(500).json({ message: "Invalid books array" });
    }

    // Sort books by title and create a new array
    const sortedBooks = [...user.books].sort((a, b) => {
      console.log("Comparing titles:", a.title, b.title);
      return a.title.localeCompare(b.title);
    });

    // Log the books after sorting
    console.log("Books after sorting:", sortedBooks);

    res.status(200).json({ message: "Books sorted by title", books: sortedBooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in sorting books by title", err: err });
  }
};

module.exports = {
  getBook,createBook,updateBook,deleteBook,getSingleBook,sortByTitle,sortByGenre
}