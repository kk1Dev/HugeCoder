require('./backend/crons/cron')
const serverConfig = require('./backend/configs/server.config');
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./backend/configs/db.config');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userModel = require('./backend/models/user.model');

//Initializing express

const app = express()

//useing the body parser for middleware 


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//db connection initiating

mongoose.connect(dbConfig.DB_URL,{useNewUrlParser:true}).then((data)=>{
    console.log(`Mongo db is connected with host :${data.connection.host}`);

},err =>{
    console.log("ERROR",err.message);

})

async function init(){

try{

    client1 = await User.create({

        name:"client1",
        userId:"client01",
        email:"kpkundan243@gmail.com",
        userType:"CLIENT",
        password:bcrypt.hashSync("welcome1",8)
    });

    client2 = await User.create({

        name:"client2",
        userId:"client02",
        email:"rakshat1984@gmail.com",
        userType:"CLIENT",
        password:bcrypt.hashSync("welcome2",8)
    });
    client3 = await User.create({

        name:"client3",
        userId:"client03",
        email:"rakshat1986@gmail.com",
        userType:"CLIENT",
        password:bcrypt.hashSync("welcome3",8)
    });
    client4 = await User.create({

        name:"client4",
        userId:"client04",
        email:"kundan.1996.243@gmail.com",
        userType:"CLIENT",
        password:bcrypt.hashSync("welcome4",8)
    })

    console.log("clients are created")
}catch(e){

    console.log(e.message)
}



await Theatre.collection.drop();
await Theatre.create({

    name:"FunCinemas",
    city:"Banglore",
    description:"Top class Theatre",
    pinCode:560052,
    movies:[movie1._id,movie2._id,movie3._id],
    ownerId:client1._id
})
await Theatre.create({

    name:"PVR cinemas",
    city:"Banglore",
    description:"Top class Theatre",
    pinCode:560095,
    movies:[movie1._id,movie2._id,movie3._id],
    ownerId:client2._id
})
await Theatre.create({

    name:"Imax",
    city:"Banglore",
    description:"Top class Theatre",
    pinCode:560085,
    movies:[movie1._id,movie2._id,movie3._id],
    ownerId:client3._id
})
await Theatre.create({

    name:"Inox",
    city:"Banglore",
    description:"Top class Theatre",
    pinCode:560052,
    movies:[movie1._id,movie2._id,movie3._id],
    ownerId:client4._id
})
await Theatre.create({

    name:"mona",
    city:"Banglore",
    description:"Top class Theatre",
    pinCode:560052,
    movies:[movie1._id,movie2._id,movie3._id],
    ownerId:client5._id
})
await Theatre.create({

    name:"savitri",
    city:"Banglore",
    description:"Top class Theatre",
    pinCode:560052,
    movies:[movie1._id,movie2._id,movie3._id],
    ownerId:client6._id
})


}







//Importing routes


require('./backend/routes/ticketNotification.route')(app)

require('./backend/routes/user.route')(app)

require('./backend/routes/auth.route')(app)

require('./backend/routes/theatre.route')(app)

require('./backend/routes/booking.route')(app)

require('./backend/routes/payment.route')(app)

require('./backend/routes/movie.route')(app)

require('./backend/routes/ticketNotification.route')(app);







//app server listion 

app.listen(serverConfig.PORT,()=>{

    console.log(`application started on the port :${serverConfig.PORT}`)

})


app.listen(serverConfig.PORT_2,()=>{

    console.log(`notification server is started on port ${serverConfig.PORT_2}`)

    
})






