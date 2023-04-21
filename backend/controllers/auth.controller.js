
const authConfig = require('../configs/auth.config')

const constants = require('../utils/constants')

const User = require('../models/user.model')

const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')

const config = require('../configs/auth.config')
const TicketNotification = require('../models/ticketNotification.model')


exports.signin = async function (req,res){

    /*
      steps =>
      check the userId in the collection 
      check the status of the user
      check the password
      send the JWT token back

    */

    const user = await User.findOne({userId:req.body.userId})

      if(user == null){
        res.status(400).send({
          message:"failed! userid doesnt exist!"
        })

        return
      }

      console.log(user.userStatus)
      if(user.userStatus != 'APPROVED'){

        res.status(200).send({

          message:`can't allow login as user is in status:${user.userStatus}`
        })
        return
      }
       
      var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password

      )

if(!passwordIsValid){
  return res.status(401).send({

    accessToken:null,
    message:"Invalid Password"
  })
}



console.log(user.userId)

var token = jwt.sign({ id:user.userId}, config.secret,{
  expiresIn:600//2 minute
})



res.status(200).send({

  name:user.name,
  userId:user.userId,
  email:user.email,
  userType:user.userType,
  userStatus:user.userStatus,
  accessToken:token
})

}



// singning up user
exports.signup = async function(req,res){
//decide the status
var userStatus = req.body.userStatus

if(!userStatus){
    //ia costomer , userstatus = approved
    //else pending
    if(!req.body.userType || req.body.userType === constants.userTypes.customer)
    {
       userStatus = constants.userStatus.approved
    }
    else{
      userStatus = constants.userStatus.pending
    }
}
const userObj = {
  name:req.body.name,
  userId:req.body.userId,
  email:req.body.email,
  userType:req.body.userType,
  password:bcrypt.hashSync(req.body.password,8),
  userStatus:userStatus
}
try{
    const userCreated = await User.create(userObj);

    const postResponse = {
    name:userCreated.name,
    userId:userCreated.userId,
    email:userCreated.email,
    userStatus:userCreated.userStatus,
    userType:userCreated.userType,
    createdAt:userCreated.createdAt,
    updatedAt:userCreated.updatedAt,
  }


  
 
 

 console.log(postResponse.email)

 if(postResponse){

  let notificationObj = {

    subject:"My movie booking app registration details ",
    content:`Dear ${postResponse.name},
    your registration is successful,
    your userId is ${postResponse.userId},
    your email id is :${postResponse.email}
    and your Password is:${req.body.password}
    
    
    thanks and regards Kundan kumar,

    for any query please reach us with details
    contact email:Kpkundan243@gmail.com  
    number:+919304178259`,
    recipientEmails:postResponse.email,
    requester:"kpkundan243@gmail.com",
    ticketId:"not available"
}
  
const notification = await TicketNotification.create(notificationObj);

 }

 res.status(201).send(postResponse)

}catch(err){


  console.log("some error while the user in db",err.message);
  res.status(500).send({message:"some internal error while inserting the element"})
  }
}




