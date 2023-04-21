const Movie = require('../models/movie.model')
const Theatre = require('../models/theatre.model')


//crateTheatre

exports.createTheatre = async (req,res) =>{


    /*

    
    
    if(!req.body.name){

        return res.status(404).send({
            message:"theatre name not found"
        })
    }

    if(!req.body.city){

        return res.status(404).send({
            message:"theatre city not found"
        })
    }

    if(!req.body.pinCode){

        return res.status(404).send({
            message:"theatre pinCode not found"
        })
    }
*/ 

    const theatreObj = {

        name:req.body.name,
        city:req.body.city,
        description:req.body.description,
        pinCode:req.body.pinCode,

    }


try{
    const theatre = await Theatre.create(theatreObj)

    res.status(200).send({
        message:"theatre created successfully",
        theatre
    })

}catch(e){
    console.log(e.message)
}

}







//updateTheatre

exports.updateTheatre = async (req,res) => {


    let savedTheatre = await Theatre.findOne({_id:req.params.id})

    if(!savedTheatre){

        return res.status(404).send({

            message:"theatre not found with this id"
        })
    }


    savedTheatre.name = req.body.name != undefined ? req.body.name : savedTheatre.name;
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode: savedTheatre.pinCode;

try{

     updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id,savedTheatre);

     res.status(200).send({
     message:"theatre updated succesfully",
     updatedTheatre

    })

}catch(e){
    console.log(e.message)
}
}


//getAllTheatre or search theatres with a movieId

exports.getAllTheatres = async (req,res) =>{

const queryObj = {};
if(req.query.name != undefined){
    queryObj.name = req.query.name;
}
if(req.query.city != undefined){
    queryObj.city = req.query.city;   
}
if(req.query.pinCode != undefined){
    queryObj.pinCode = req.query.pinCode;  
}

try{
    let theatres = await Theatre.find(queryObj)
    if(req.query.movieId != undefined){
        theatres = theatres.filter(
            t => t.movies.includes(req.query.movieId)
        )
    }
    res.status(200).send({
        message:"found success",
        theatres

    })


}catch(e){

    console.log(e.message);
}
    /*
  const theatre  =  await Theatre.find() 
  
  if(!theatre){

    return res.status(404).status({

         message:"no theatre found"
        
    })
  }

  res.status(200).send({

    message:"success",
    theatre
  })

  */


}

//getTheatre

exports.getTheatre = async (req,res) =>{

try{const theatre = await Theatre.findOne({_id:req.params.id});
res.status(200).send({
    
    message:"theatres found",
    theatre
  });

}catch(e){   

     console.log(e.message)
}
    
}

//delete Theatre

exports.deleteTheatre = async (req,res) =>{

    try

     { 
        await Theatre.deleteOne({_id:req.params.id})

        res.status(200).send({
    
        message:"theatre deleted sucessfully",
        
      })
}catch(e){

    console.log(e.message);
  }

}


//add or remove movie inside a theatre


exports.putMoviesToATheatre = async(req,res) =>{

    var savedTheatre = await Theatre.findOne({_id:req.params.id});
    const movieIds = req.body.movieIds;
    if(req.body.insert === "true"){

        movieIds.forEach(movieId =>{

            savedTheatre.movies.push(movieId)

//to solve duplicate movies inside theatre movie array 
        })
    }

    else{

        var savedMovieIds = savedTheatre.movies

        movieIds.forEach(movieId => {
//delete movieid from savedMovieIds

            savedMovieIds = savedMovieIds.filter(smi => smi != movieId)
        })

        savedTheatre.movies = savedMovieIds

    }

    try{

        const updatedTheatre = await savedTheatre.save();

        res.status(200).send(updatedTheatre)
    }catch(e){
        console.log(e.messgae)
    }
}

//check a movie in a theatre

exports.checkMovieInTheatre = async (req,res) => {

    const savedTheatre = await Theatre.findOne({_id:req.params.theatreId})
    const savedMovie = await Movie.findOne({_id:req.params.movieId})

    try{


        const responseBody = {
            message:savedTheatre.movies.includes(savedMovie._id)
            ? "Movie is present"
            : "Movie is not present"
        }

  res.status(200).send({responseBody})
    }catch(e){

        console.log(e.message)

    }

/*
    const theatre = await Theatre.findOne({_id:req.params.theatreId})
    const movies = theatre.movies

    let movie = movies.includes(req.params.movieId)

    if(!movie){
        return res.status(401).send({
            message:`${movie} is not found in ${theatre}`
        })
    }
    
    res.status(200).send({
        message:"success true",
        theatreId:req.params.theatreId,
        theatreName:theatre.name,
        theatreDiscription:theatre.description,
        movieId:req.params.movieId
    })
    */
}











