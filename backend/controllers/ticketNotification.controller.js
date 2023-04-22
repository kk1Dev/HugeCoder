const TicketNotification = require("../models/ticketNotification.model");

//accepting notification request 


exports.acceptNotificationRequest = async (req,res) => {


    const notificationObj = {


        subject:req.body.subject,
        content:req.body.content,
        recipientEmails:req.body.recipientEmails,
        requester:req.body.recipientEmails,
        ticketId:req.body.ticketId
    }

    try{

      const notification = await TicketNotification.create(notificationObj);

      res.status(200).send({

        requestId:notification.ticketId,
        status:"Accepted Request"
        
      })
    }catch(err){
        console.log(`error while accepting,${err.message}`);
    }
}


//getting the notification

exports.getNotificationStatus = async (req,res) => {

    const reqId = req.params.id;

    try{

        const notification  = await TicketNotification.find({ticketId:reqId})

        res.status(200).send({

            requestId:notification.ticketId,
            subject:notification.subject,
            content:notification.content,
            recipientEmails:notification.recipientEmails,
            sentStatus:notification.sentStatus
        })
    }catch(err){

        console.log(`error while fetching a notification message:${err.message}`)
    }
}



exports.sendNotification = async (req,res) =>{


    const notificationObject = {


        
    }
}
/*
exports.acceptNotificationRequest = async (req, res) =>{
    const notificationObject = {
           subject : req.body.subject,
           content : req.body.content,
           recepientEmails : req.body.recepientEmails,
           reuester : req.body.reuester,
           ticketId : req.body.ticketId

    };

    try{
    const notification = await TicketNotification.create(notificationObject);

    res.status(201).send({
        requestId : notification.ticketId,
        status : "Accepted Request"
    })
    }catch(err){
        console.log(`Error while accepting a notification request : ${err.message}`);
    }
}


exports.getNotificationStatus = async (req, res) =>{
    
    const reqId = req.params.id;
    try{
    const notification = await TicketNotificationModel.findOne({
        ticketId : reqId
    })

    res.status(200).send({
        requestId : notification.ticketId,
        subject : notification.subject,
        content : notification.content,
        recepientEmails : notification.recepientEmails,
        sentStatus : notification.sentStatus
    })
    }catch(err){
        console.log(`Error while fetching a notification request : ${err.message}`);
    }
}

*/