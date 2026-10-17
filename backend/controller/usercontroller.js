const express=require('express');
const User = require('../model/User');
const { hashPassword } = require('../utils/hasher');
const registerUser=async(req,res)=>{
    try {
    const {name,email,password}=req.body;
    const existingUser= await User.findOne({email})
    if(!existingUser){
        const hashedpassword=await hashPassword(password)
        const newUser=await User.create({name,email,password:hashedpassword})
        res.status(201).json({message:"new user created successfully",
            newUser
        })
    }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports=registerUser