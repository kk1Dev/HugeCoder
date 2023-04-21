
const User = require('../models/user.model')

const validateUserReqBody =  (req,res,next) => {


//name userID,emaill,password

 

    if(!req.body.name){

        res.status(404).send({message:"user name not provided"})

        return

    }

    if(!req.body.userId){

        res.status(404).send({message:"userId not provided"})

        return

    }


    if(!req.body.email){

    res.status(404).send({message:"email not proviede"})
    return

    }


    if(!req.body.password){


        res.status(404).send({message:"password not provided"})

        return
    }


       
    next()

}



const verifyUserReqBody  = {

    validateUserReqBody : validateUserReqBody

}

module.exports =  verifyUserReqBody