const notificationController = require('../controllers/ticketNotification.controller');
//const { authJwt, verifyTicketRequestBody } = require("../middlewares");

module.exports = function (app) {

    app.post("/mba/api/notifications", notificationController.acceptNotificationRequest);
    
    app.get("/mba/api/notifications/:id", notificationController.getNotificationStatus);

}