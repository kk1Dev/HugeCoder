

const mongoose  = require('mongoose');


//defining the movie model schema

const movieSchema = new mongoose.Schema({
    
    name:{
        type:String, 
        require:true,
    },
    descreption:{
        type:String,
        require:true,
    },
    casts:{
        type:[String],
        required:true
    },
    trailerUrl:{
        type:String,
        required:true,
    },
    posterUrl:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
        default:"Hindi"
    },
    releaseDate:{
        type:String,
        required:true,
    },
    director:{
        type:String,
        required:true,
    },
    releaseStatus:{
        type:String,
        enum:['RELEASED','UNRELEASED','BLOCKED'],
        default:"RELEASED"
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }

})


module.exports = mongoose.model("Movie",movieSchema);