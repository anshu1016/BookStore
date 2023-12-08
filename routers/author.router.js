const express = require("express");
const authorRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");


const {getBooksByAuthor} = require("../controllers/author.controller.js");

authorRouter.get("/:authorId/books",authMiddleware, getBooksByAuthor);

module.exports = authorRouter;