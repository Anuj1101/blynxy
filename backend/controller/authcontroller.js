const express=require('express');
const User = require('../model/User');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=>{
    try {
    const {name,email,password}=req.body;
    const existingUser= await User.findOne({email})
    if(!existingUser){
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashedpassword})
        res.status(201).json({message:"new user created successfully",
            name:newUser.name,
            email:newUser.email,
            id:newUser._id
        })
    }
    return res.status(309).json({message:"user already exist"})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const loginUser=async(req,res)=>{
    try {
    const {email,password}=req.body;
    const existingUser= await User.findOne({email})
    if(!existingUser){
        return res.status(401).json({message:"no registration on the mail"})
    }
    const isMatched= await bcrypt.compare(password,existingUser.password)
    if(!isMatched){
        return res.status(401).json({message:"password didn't matched"})
    }
    const accesstoken=await jwt.sign({
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email
    },process.env.ACCESS_JWT_SECRET,{expiresIn:'5m'})
    const refreshtoken=await jwt.sign({
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email
    },process.env.REFRESH_JWT_SECRET,{expiresIn:'8d'})

    existingUser.refreshTonkenHash=refreshtoken;
    existingUser.save()

    res.status(200).json({message:"password matched and you logged in succeessfully",
        user:{name:existingUser.name,email:existingUser.email},
        accesstoken
    })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    // 2. Refresh Token verify karo
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );

    // 3. Database mein token aur user match karo
    const user = await User.findOne({
      _id: decoded.id,
      refreshToken: refreshToken,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid or revoked refresh token",
      });
    }

    // 4. Naya Access Token generate karo
    const accessToken = jwt.sign(
      {
        id: user._id,
        name:user.name,
        email:user.email
      },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // 5. Naya Access Token frontend ko bhejo
    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Refresh token is invalid or expired",
    });
  }
};

module.exports={registerUser,loginUser,refreshAccessToken}