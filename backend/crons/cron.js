const cron = require('node-cron');
const TicketNotification = require("../models/ticketNotification.model");
const EmailTransporter = require("../notifier/emailService");
const nodemailer = require('nodemailer')





cron.schedule('*/30  * * * * *', async () => {
    /**
     * Logic inside this to search the db every 30 seconds and send the emails for any new request
     */



    const notifications = await TicketNotification.find({sentStatus:"UN_SENT"});

    notifications.forEach(notification => 
    { 
        const mailData = {
            from: 'kpkundan243@gmail.com',
            to: notification.recipientEmails,
            subject: notification.subject,
            text: notification.content
            
        };

        EmailTransporter.sendMail(mailData, async function (err, info) 
           {
            if (err)
                console.log(err.message);
            else
                console.log(info);
                //Update the DB
                const savedNotification  = await TicketNotification.findOne({_id : notification._id});
                savedNotification.sentStatus = "SENT";
                await savedNotification.save();

            }                    );
    });
})