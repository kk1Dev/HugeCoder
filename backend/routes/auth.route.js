const authController = require('../controllers/auth.controller')
const authJwt = require('../middlewares/authJwt')

const {verifyUserReqBody}  = require('../middlewares')

module.exports = function (app){

    console.log("i m at auth route")

    app.post('/mba/api/auth/signup',[verifyUserReqBody.validateUserReqBody],authController.signup)

    app.post('/mba/api/auth/signin',authController.signin)

}