const express = require("express");
const bookRouter = express.Router();
const {getBook,createBook,updateBook,deleteBook,getSingleBook,sortByTitle,sortByGenre} = require("../controllers/book.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js");
bookRouter.get("/",authMiddleware,getBook);
bookRouter.post("/",authMiddleware,createBook);
bookRouter.put("/:ID",authMiddleware,updateBook);
bookRouter.get("/:ID",authMiddleware,getSingleBook);
bookRouter.delete("/:ID",authMiddleware,deleteBook);
bookRouter.get("/sortByGenre",authMiddleware,sortByGenre);
bookRouter.get("/sortByTitle",authMiddleware,sortByTitle);
module.exports = bookRouter;



