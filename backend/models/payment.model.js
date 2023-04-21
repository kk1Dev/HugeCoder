const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({




    bookingId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Booking"
    },
    amount:{

        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"FAILED"
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
})


module.exports = mongoose.model("Payment",paymentSchema)