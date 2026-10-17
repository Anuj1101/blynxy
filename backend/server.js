const express=require('express')
const cors=require("cors")
const dotenv=require('dotenv');
const connectDb = require('./config/db');
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
const port=process.env.PORT;

connectDb();

app.get('/health',(req,res)=>{
    res.send('<h1 style="color:whitesmoke;background-color:blue;border-radius:25px;padding:20px">server is running well</h1>')
})
app.post('/health',(req,res)=>{
    res.status(200).json({
        message:"well done my boy"
    })
})



app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})