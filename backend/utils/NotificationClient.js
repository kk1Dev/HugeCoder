var Client = require("node-rest-client").Client;

var client = new Client();


exports.client = client;

exports.sendEmail = (ticketId,subject,content,emailIds,requester) =>{



    var reqBody = {

        subject:subject,
        content:content,
        recepientEmails:emailIds,
        requester:requester,
        ticketId:ticketId
    }


    var args = {


        data:reqBody,
        headers:{ "Content-Type":"application"}
    }


};


client.post("http://localhost:8080/backend/notifier")