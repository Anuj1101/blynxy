const express=require('express')
const {registerUser,loginUser, refreshAccessToken, logout} = require('../controller/authcontroller')
const router=express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/refreshtoken',refreshAccessToken)
router.post('/logout',logout)
module.exports=router