

const mongoose = require('mongoose')
console.log("i am at theatre schema")
const theatreSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },
    ownerId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User"
    }



})


module.exports = mongoose.model("Theatre",theatreSchema)