const Booking = require('../models/booking.model')

const User = require("../models/user.model")



//getting all bookings


console.log("i am inside the booking controller");


exports.getAllBookings = async (req,res) => {

 try{    
    
    const bookings = await Booking.find( )


    res.status(200).send({

        message:"request successfully",

        bookings
    })

}catch(e){

    console.log(e.message)

    res.status(403).send({

        message:"Error: No booking record found!"
    })

  }

}


//getting bookings on id

exports.getBookingOnId = async(req,res) => {

         const user = await User.findById(req.params.id)


    if(!user) {

        return res.status(402).send({
         
        message:"no user found with this id"

        })
    }

    try{    const bookings = await Booking.findById(req.body.bookingId)
       
         if(!bookings){

         return res.status(403).send({

            message:"no bookings found with this userid"
          })
         }

         res.status(200).send({

         message:"bookings found!",
         bookings

     })
}catch(e){

        console.log(e.message)

        res.status(403).send({

        message:"no booking found"
    })
  } 
}


//creating a booking --customer


exports.createBooking = async (req,res) => {


    const user = await User.findById({_id:req.body.userId})

    if(!user){

      return  res.status(404).send({

      message:"user not found with this id"

    
        })

    }


    const bookingObj = {

      theatreId:req.body.theatreId,
      movieId:req.body.movieId,
      userId:req.body.userId,
      bookingTime:req.body.bookingTime,
      bookingStatus:req.body.bookingStatus,
      noOfSeats:req.body.noOfSeats,
      totalCost:req.body.totalCost
      
    }


   const  booking = await Booking.create(bookingObj)


   res.status(200).send({

    message:"booking created with status IN_PROGRESS",
    booking
   })
    
    
}


//update a bookings --admin

//cancel a bookings --customer

// delete a bookings --admin


exports.updateBooking = async (req,res) => {

//find the id with relevent to the booking

const savedBooking = await Booking.findById(req.params.id)


// take the parameters from the req body 

if(!savedBooking){

  return  res.status(402).send({

    message:"booking id not found"
  })
}

var bookingObj = {

 bookingStatus:req.body.bookingStatus
  
}

// check the parameters from the req body


if(!bookingObj){

  return res.status(404).send({

    message:"please provide the bookingStatus"
  })
}

savedBooking.bookingStatus = bookingObj.bookingStatus != undefined ? req.body.bookingStatus : savedBooking.bookingStatus;

// update the bookings

var updatedBooking = await savedBooking.save()

res.status(200).send({

  message:"booking status updated successfully",

  updatedBooking


  })

}



