if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

module.exports = {
    PORT: process.env.PORT,
    PORT_2:process.env.PORT_2
}



/*
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT
}*/