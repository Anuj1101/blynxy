const express=require('express')
const { profile } = require('../controller/developercontroller')
const router=express.Router()
router.get('/devProfile',profile)

module.exports=router