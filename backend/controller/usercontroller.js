const getmydata=(req,res)=>{
    const{name,email}=req.user
    res.send("hello "+ name+' we found your data')
}
module.exports=getmydata