
const constants = require("../utils/constants");

validateMovieRequestBody = async (req,res,next) => {
    

    // validate the movie name 

    if(!req.body.name){
        return res.status(400).send({
            message:" !failed ...Movie name not provided"
        });
    }


//validate the movie status 

if(!req.body.releaseStatus){
 
    res.status(400).send({
        message:"!failed ... Movie status not found"
    })
}


//checking the correct value of the status

const releaseStatus = req.body.releaseStatus

const releaseStatusTypes = [constants.releaseStatus.unreleased,constants.releaseStatus.released,constants.releaseStatus.blocked]

if(!releaseStatusTypes.includes(releaseStatus)){

    return res.status(400).send({
        message:"Movie release status invalid Please enter among [UNRELEASED/RELEASED/BLOCKED]"
    })
}

//validate release date 

if(!req.body.releaseDate){

    return res.status(400).send({
        message:"!failed ...Movie Release Date not found"
    })

}

//validate director


if(!req.body.director){
    return res.status(400).send({
        message:"!failed ... movie directror name not found"
    })
}

next();

}

const verifyMovieReqBody = {

    validateMovieRequestBody : validateMovieRequestBody
};

module.exports = verifyMovieReqBody;

