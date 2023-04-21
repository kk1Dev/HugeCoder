
const userController = require('../controllers/user.controller')

const authJwt = require('../middlewares/authJwt')

const verifyUserReqBody = require('../middlewares/verifyUserReqBody')

module.exports = function (app){

    console.log('i am at user route')

    app.post('/mba/api/users',userController.registerUser)

    app.get("/mba/api/users",[authJwt.isAdmin],userController.getAllusers)

    app.put('/mba/api/users',[authJwt.verifyToken],userController.update)

    app.put('/mba/api/users/:id',[authJwt.verifyToken],userController.updateUser).delete(userController.deleteUser)

    
}