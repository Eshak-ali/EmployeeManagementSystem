const mongoose=require('mongoose')

const Admin=new mongoose.Schema({
    name:String,
    password:String,
    phone:Number,
    email:String,
    image:String
})


module.exports=mongoose.model("Admin",Admin)