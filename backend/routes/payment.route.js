

const paymentController = require("../controllers/payment.controller")

module.exports = function (app){

    console.log("i am at payment route")

   // app.get("/mba/api/payments",paymentController.getAllPayments)

    app.get("/mba/api/payments/:id",paymentController.getAllPayments)

    app.post("/mba/api/payments",paymentController.createPayment)

    
}