

const mongoose = require('mongoose')

console.log(" I am inside the booking model")

const bookingSchema  = new mongoose.Schema({

        theatreId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Theatre" 
       },
        movieId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Movie"
       },
        userId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"User"
       },
       bookingTime:{
        type:String,
        required:true
       },
        bookingStatus:{
        type:String,
        default:"IN_PROGRESS"
       },
       createdAt:{
         type:Date,
         immutable:true,
         default:Date.now()
       },
       updated:{
        type:Date,
        default:()=>{
        return Date.now()
        }
        }
       ,
       noOfSeats:{
        type:Number,
        required:true
       },
       totalCost:{
        type:Number
       }


})



module.exports = mongoose.model("Booking",bookingSchema)