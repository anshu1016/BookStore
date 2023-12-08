const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const {connectDB} = require("./db/db.js");
const authRouter = require("./routers/auth.router.js");
connectDB();
const bookRouter = require("./routers/book.router.js");
const authorRouter = require("./routers/author.router.js");
const cartRouter = require("./routers/cart.router.js")


// Middleware
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(express.json());


//Routers
app.get("/", (req, res) => {
  res.send("Hello Express App!");
})
app.use("/auth",authRouter);
app.use("/book",bookRouter);
app.use("/author",authorRouter);
app.use("/shopping-cart", cartRouter);
//PORT LLISTEN
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh5ekBnbWFpbC5jb20iLCJpZCI6IjY1NzJhMzE0NGEwZjBkYzczYTQwYTQ5MyIsImlhdCI6MTcwMjAxMTY2OCwiZXhwIjoxNzAyMDk4MDY4fQ.LTjLP9bzphbYzez54KUsjREP_xTFBXSfND0wXJbClZ4 ===XYZ