const UserModel = require("../model/auth.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "BOOKSTORE"
const signup = async(req,res)=>{
  const {username,email,password} = req.body;
  try{
const existingUser = await UserModel.findOne({email:email});
    if(existingUser){
      return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
  const result = await UserModel.create({
    username:username,
    email:email,
    password:hashedPassword
  });    
    const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY,{expiresIn:"24h"});
    res.status(201).json({message:"User created successfully",token:token});
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"Internal server error"})
  }
}

const signin = async(req,res)=>{
  try{
    const {email,password} = req.body;
    console.log(email,password,"EMAIL&PASSWORD")
    const existingUser = await UserModel.findOne({email:email});
    if(!existingUser){
      return res.status(404).json({message:"User not found"});
    }
    const isPasswordMatch = await bcrypt.compare(password,existingUser.password);
    if(!isPasswordMatch){
      return res.status(401).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY,{expiresIn:"24h"});
    res.status(200).json({message:"User logged in successfully",token:token,user:existingUser});
  }
  
  catch(err){
    console.log(err)
    res.status(500).json({message:"Unable to login"})
  }
}

module.exports = {signin,signup}