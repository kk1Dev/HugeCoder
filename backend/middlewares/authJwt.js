const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const authConfig = require('../configs/auth.config')
const constants = require('../utils/constants')




const verifyToken = (req,res,next) => {

    let token = req.headers['x-access-token']


    if(!token){
         
        return res.status(403).send({

            message:"token not provided"
        })

    }
try
{ 
    
   const decoded =  jwt.verify(token,authConfig.secret)


console.log(authConfig.secret)
   console.log(decoded)

   return decoded,next()



}catch(err){

    res.status(404).send({

        message:"token err",
        err
    })
    console.log(err)
f

    return null
    
    
}/*
     jwt.verify(token,authConfig.secret,(err,decoded)=>{

        if(err){

            return res.status(401).send(
                "unauthorized"
            )

        } 

        req.userId = decoded.id
        next();
    
     })
*/
}
//api endpoint -> verifyToken->isAdmin->controller


const isAdmin = async (req,res,next) => {


try{

    const user = await User.findOne({ userId:req.body.userId })
/*
    res.status(200).send({
        message:"success",
        user
    })
*/



   console.log("I am at top of user.userType")
   console.log(user.userType)

    if(user.userType === constants.userTypes.admin){

        next()
    }
  
     else{

        console.log(user)
        res.status(403).send({

            message:" Admin role required!",
            user, })
     }


}catch(e){

    console.log(e.message)
    res.status(500).send("Internal server Error")
}
}

const authJwt = {

    verifyToken: verifyToken,
    isAdmin: isAdmin

}

module.exports = authJwt;

