const express=require('express')
const getmydata = require('../controller/usercontroller')
const router=express.Router()
router.get('/me',getmydata)
module.exports=router