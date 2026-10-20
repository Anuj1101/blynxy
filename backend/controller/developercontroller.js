const Developer = require("../model/DeveloperProfile")

const profile=async(req,res)=>{
    const id=req.user.id
    try {
    const curruser=await Developer.find({userId:id})
    if(!curruser){return res.status(401).json({message:"no developer found for this id"})}
    res.status(200).json({message:'developer data found',
        dev:curruser,
        success:true
    })
    } catch (error) {
        return res.status(500).json({message:error.message,
            success:false
        })
    }
}

const updateProfile=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports={profile}