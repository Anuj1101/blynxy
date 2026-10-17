const mongoose=require('mongoose')
const connectDb=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('db connected');
    }
    catch(err){
        console.log("db din't connected",err.message)
    }
}
module.exports=connectDb