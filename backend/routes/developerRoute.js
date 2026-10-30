const express=require('express')
const { profile, updateProfile } = require('../controller/developercontroller')
const authmiddleware=require('../middlewares/authmiddleware')
const router=express.Router()
router.get('/devProfile',authmiddleware,profile)
router.put('/updatedev',authmiddleware,updateProfile)

module.exports=router