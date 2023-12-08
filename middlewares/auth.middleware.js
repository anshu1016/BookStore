const jwt = require('jsonwebtoken');
const SECRET_KEY = "BOOKSTORE"
const authMiddleware = (req, res, next) => {
  try{
    let token = req.headers.authorization;
    if(token){
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id
    }
    else{
      res.status(401).json({message: "You are not authorized to access this resource"})
    }
    next();
    }
  catch(err){
    console.log("Authentication failed due to : ",err)
    res.status(401).json({message: "You are not authorized to access this resource"})
  }
  }


module.exports = authMiddleware;