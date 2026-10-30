const Developer = require("../model/DeveloperProfile")

const profile=async(req,res)=>{
    const id=req.user.id
    try {
    const curruser=await Developer.findOne({userId:id})
    if(!curruser){return res.status(401).json({message:"no developer found for this id"})}
    res.status(200).json({message:'developer data found',
        dev:curruser,
        name:req.user.name,
        success:true
    })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:error.message,
            success:false
        })
    }
}

const updateProfile=async(req,res)=>{
    try {
         const id=req.user.id
        if(!id){
           return res.status(400).json({message:"no id found for updation",success:false})
        }
        const allowedFields=["username","skills","visibility","bio","githuburl","portfolioUrl","avatarUrl"]
        const updates={}
        for(const field of allowedFields){
            if(req.body[field]!==undefined){
                updates[field]=req.body[field]
            }
        }
        if(Object.keys(updates).length===0){
            return res.status(200).json({message:"no need to update",
                success:true
            })}
        const newuser=await Developer.findOneAndUpdate({userId:id},{$set:updates},{returnDocument:'after',runValidators:true,upsert:true})
        if(!newuser){
            return res.status(404).json({message:"didn't updated",success:false})
        }
        return res.status(200).json({
            message:"data updated seccessfully",
            newuser,
            success:true
        })



    } catch (err) {
        return res.status(500).json({message:"internal error",error:err.message,success:false})
    }
}

module.exports={profile,updateProfile}