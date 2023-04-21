const User = require('../models/user.model')

const TicketNotification = require('../models/ticketNotification.model')

const bcrypt = require('bcryptjs');

exports.update = async function(req,res){

    const userIdReq = req.body.userId;

const newPassword = { password : bcrypt.hashSync(req.body.password,8) }

    try{

        let user = await User.findOneAndUpdate({userId:userIdReq},newPassword).exec()

        if(user){

            let notificationObj = {
          
              subject:"user password updated,My Movie booking app",
              content:`Dear ${user.name},
              your password updation is successful,
              your userId is ${user.userId},
              your email id is :${user.email}
              and your Password is:${user.password}
              
              
              thanks and regards Kundan kumar,
          
              for any query please reach us with details
              contact email:Kpkundan243@gmail.com  
              number:+919304178259`,
              recipientEmails:user.email,
              requester:"kpkundan243@gmail.com",
              ticketId:"not available"
          }
            


        let notification = await TicketNotification.create(notificationObj)

        }
            res.status(200).send({

                message:"user record has been updated",
                user
                
                })

    }catch(e){

        console.log(e.message)
    }
}


//update the userStatus 

exports.updateUser = async function(req,res){

    const userIdReq = req.params.id;

    try{

        const user = await User.findOneAndUpdate({ _id:userIdReq },{

            name:req.body.name,

            userStatus:req.body.userStatus,

            userType:req.body.userType

        }).exec();

        res.status(200).send({

            message:'user record has been updated successfully',
            user

        })
    }catch(err){

        console.err("Error while updating the record",err.message)

        res.status(500).send({

            message:'some internal error'

        })
    }

}


//getting all users //admin route

exports.getAllusers = async (req,res) => {

    const user = await User.find();

    if(!user){

            return res.status(404).send({

            message:"user not found"
       
       
        })
    }

    res.status(200).send({

        message:"success",

        user
    })
}

//getting user by Id //admin route

exports.getUser = async function (req,res){

    const user = await User.findById(req.params.id)

    if(!user) {

        return res.status(404).send({

            message:"user not found"
        })
    }

    res.status(200).send({

        message:"success",

        user

    })
}

//deleting a user


exports.deleteUser = async (req,res) =>{

try{    const user = await User.deleteOne({_id:req.params.id})

     res.status(200).send({

     message:'user deleted successfully',

     user

    })
}catch(e){

    console.log(e.message)
     
    }    

   }
// register a user


exports.registerUser = async (req,res) => {

    let userObj = {
  
      name:req.body.name,
      userId:req.body.userId,
      email:req.body.email,
      password:req.body.password,

    }
  
  try{
  
      const user = await User.create(userObj)
  
      res.status(200).send({
  
          message:"user created successfully",
          user
  
      })
  
  }catch(e){
  
      res.status(401).send("some internal error happend while registering ")
      console.log(e.message)
    }
  
  
  }