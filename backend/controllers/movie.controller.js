
const Movie = require('../models/movie.model')



//get all movies or movie by name

exports.getAllMovies = async (req,res) => {

    const queryObj = {}

    if(req.query.name != undefined ){ queryObj.name = req.query.name }

    try{
    //const movies = await Movie.find(queryObj)

    const movies = await Movie.find()

    res.status(200).send(movies)

} catch(e){

    console.log(e.message)
}

}




//get movie by id

exports.getMoviesById = async (req,res) => {

try{
    const movies = await Movie.findById(req.params.id)

    if(!movies){

        return res.status(404).json({

            movie:"movies is not found"

        })
    }

    res.status(200).json({
        movies
     })

} catch(e){

    console.log(e.message)
}

}



//creating movies in database


exports.createMovie = async (req, res) => {


 
 
    //verification of request for  creating movie
/*
if(!req.body.name)

{  
    return res.status(400).send({ 
        message:"!!failed!! movie name not provided"
     }) 
}
  
if(!req.body.releaseStatus){

    return res.status(400).send({
        message:"movie status not found"
    })
}

const constants = {
    releaseStatus: {
      unreleased: 'UNRELEASED',
      released: 'RELEASED',
      blocked: 'BLOCKED'
    }
  };

const releaseStatus = req.body.releaseStatus;

const releaseStatusTypes = [ constants.releaseStatus.unreleased , constants.releaseStatus.released , constants.releaseStatus.blocked ]

if(!releaseStatusTypes.includes(releaseStatus)){

    return res.status(400).send({
        message:"Movie release status invalid Please enter among [UNRELEASED/RELEASED/BLOCKED]"
    })
}

if(!req.body.releaseDate){

    return res.status(400).send({

        message:"release date not found"
    })
}
*/

const movieObject = {

name: req.body.name,
description: req.body.description,
casts: req.body.casts,
director: req.body.director,
trailerUrl: req.body.trailerUrl,
posterUrl: req.body.posterUrl,
language: req.body.language,
releaseDate: req.body.releaseDate,
releaseStatus: req.body.releaseSatus 
}
try{

const movie = await Movie.create(movieObject);


res.status(201).send(movie); 
 
}catch(e){

    console.log(e.message)

  }

}



//Updating movie based on movie id


exports.updateMovie = async (req,res) => {

const savedMovie = await Movie.findOne({ _id: req.params.id})

if(!savedMovie){
    res.status(400).send({
        message:"Movie is being updated doesn't exit"
    })
}

savedMovie.name = req.body.name != undefined ? req.body.name : savedMovie.name;
savedMovie.description = req.body.description != undefined ? req.body.description : savedMovie.descreption;
savedMovie.casts = req.body.casts != undefined ? req.body.casts : savedMovie.casts;
savedMovie.director = req.body.director != undefined ? req.body.director : savedMovie.director;
savedMovie.trailerUrl = req.body.trailerUrl != undefined ? req.body.trailerUrl : savedMovie.trailerUrl;
savedMovie.posterUrl = req.body.posterUrl != undefined ? req.body.posterUrl : savedMovie.posterUrl;
savedMovie.language = req.body.language != undefined ? req.body.language : savedMovie.language;
savedMovie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : savedMovie.releaseDate;
savedMovie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : savedMovie.releaseStatus;

try{
    var updatedMovie = await savedMovie.save();
    res.status(200).send(updatedMovie)
}

catch(e){
    console.log(e.message);
}

/*

let movie = await Movie.findById(req.params.id)

if(!movie){

        return  res.status(400).send({

        message:"movie not found with this id"
    })

}

movie = await Movie.findOneAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
})

res.status(200).send({
    message:"success",
    movie
})
 */
}

//deleting a movie


exports.deleteMovie = async(req,res) =>{

    const movi = await Movie.findById(req.params.id)

    if(!movi){

        return res.status(400).send({
            message:"no movie found with this id"
        })

    }
try{
    await Movie.deleteOne({_id:req.params.id});
    //await Movie.findByIdAndDelete(req.params.id)

    res.status(200).send({

        message:"successfully deleted the movie"
    })
}catch(e){
    console.log(e.message)
}
   
}






