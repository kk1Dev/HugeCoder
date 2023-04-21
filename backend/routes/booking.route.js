const bookingController = require('../controllers/booking.controller')
const verifyBookingRequestBody = require("../middlewares/verifyBookingTicketReqBody")

module.exports = function (app) {

console.log(verifyBookingRequestBody.validateBookingRequestBody)

    console.log(" i am inside booking route")

    app.get("/mba/api/bookings",bookingController.getAllBookings);

    app.get("/mba/api/bookings/:id",bookingController.getBookingOnId);

    app.post("/mba/api/bookings",bookingController.createBooking);

    app.put("/mba/api/bookings/:id",bookingController.updateBooking);

}