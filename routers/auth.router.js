const express = require("express");
const authRouter = express.Router();
const {signin,signup} = require("../controllers/auth.controller.js");

authRouter.post("/signup", signup);
authRouter.post("/singin",signin)

module.exports = authRouter;