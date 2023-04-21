
const constants = require("../utils/constants");

var ObjectId = require('mongoose').Types.ObjectId;

const Theatre = require("../models/theatre.model")
 


validateBookingRequestBody = async (req, res, next) => {


    console.log("i am at validate request body")
if (!req.body.theatreId) {
return res.status(400).send({
message: "Failed! theatreId is not provided !"
});
}


if (!ObjectId.isValid(req.body.theatreId)) {
return res.status(400).send({
message: "Failed! theatreId is not valid format !"
});
}

if (!req.body.movieId) {
return res.status(400).send({
message: "Failed! movieId is not provided !"
});
}
    if(!ObjectId.isValid(req.body.movieId)){
return res.status(400).send({
message: "Failed! movieId is not valid format !"
});
}


const theatre = await Theatre.findOne({_id:req.body.theatreId});

let x = theatre.movies

console.log(x)

//if(theatre){

  //  res.status(200).send({movies:theatre.movies}
  //  )
//}

if(theatre === null){

    return res.status(400).send({
    message: "Failed! Theatre passed doesn't exist !"
    });
    }

    console.log(theatre.movies);



    
    
    if(!theatre.movies.includes(req.body.moviesId)){
    return res.status(400).send({
    message: "Failed! movieId passed is not available inside the theatre!"
    });
    }

    if (!req.body.bookingTime) {
    return res.status(400).send({
    message: "Failed! timing is not provided !"
    });
    }

    if (!req.body.noOfSeats) {
    return res.status(400).send({
    message: "Failed! number of seats is not provided !"
    });
    }
    next();
    }


    const verifyBookingReqBody =
   {
     validateBookingRequestBody : validateBookingRequestBody
    };
    module.exports = verifyBookingReqBody