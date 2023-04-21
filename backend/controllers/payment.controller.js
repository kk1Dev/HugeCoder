
const Booking = require("../models/booking.model")

const User = require("../models/user.model")

const Payment = require("../models/payment.model")

const constants = require("../utils/constants")

const TicketNotification = require("../models/ticketNotification.model")



//creating a payment 

    exports.createPayment = async(req,res) => {


        const booking = await Booking.findOne({

            _id:req.body.bookingId
        });


        const usrId = booking.userId;
        const user = await User.findById({_id:usrId});
         var emails = user.email;
        var bookingTime = booking.createdAt
        var currentTime = Date.now()
        //  var minutes = Math.floor((currentTime - bookingTime)/1000/60) 
        let minutes = 4
        if(minutes > 5){

            booking.bookingStatus = constants.bookingStatus.expired

            await booking.save()

            return res.status(404).send({

                message:"Can't do the payment as the booking is delayed and expired"
            })
        }

        else{

            booking.bookingStatus = constants.bookingStatus.completed

            await booking.save()

            let paymentObj = {

                bookingId : req.body.bookingId ,
              //this amount should be imported from movie 
                 amount:req.body.amount,

                //status should be payment completed if completed,cancelled if payemnt is cancelled 
                status : constants.paymentStatus.success   
            }

            const payment = await Payment.create( paymentObj
            )

            let notificationObj = {


                subject:"payment is completed successfully",
                content:`payment details is ${payment}`,
                recipientEmails:emails,
                requester:"kpkundan243@gmail.com",
                ticketId:"not available"
            }

            // we will create a notification with sentStatus: unsent

            const notification  = await TicketNotification.create(notificationObj)


            return res.status(200).send({


                mailsent:notificationObj,
                message:"payment completed successfully",
                payment
            })
        }


    }



    //getting all the payment 


    exports.getAllPayments = async (req,res) => {

    try{
        
       // const queryObj = {}

    const user = await User.findById(req.params.id)

    console.log(user)

    if(user.userType !== constants.userTypes.admin){

        res.status(400).send({

            message:"user is not admin and its not  authorized"
        })
    }


       // const bookings = await Booking.find()

        //const bookingIds = bookings.map( b => b._id)


      //  console.log(bookingIds)

   //     queryObj._id = {$in:bookingIds}

    //const payments = await Payment.find(queryObj)
    const payments = await Payment.find()

    res.status(200).send({

        message:"all payments found successfully",
        payments
    })

   }catch(e){

    res.status(200).send({

        message:" some error catched"
    })
   }
    }


    // get payment by payment id 

    exports.getPaymentById = async (req,res) => {

        try {
            
            const payment = await Payment.findById(req.params.Id)


            if(!payment) {


                res.status(404).send({


                    message:"payment not found with this paymentid ",
                    payment
                })
            }

            res.status(200).send({

                message:"payment id found",
                payment
            })
        
        
        
        }catch(e){

           console.log(e.message)

           res.status(403).send({


            message:e.message

            
           })
        }

    

    }
