validateTheatreRequestBody =  (req,res,next) => {
    

    // validate the Theatre name 

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


next();

}

const verifyTheatreReqBody = {

    validateTheatreRequestBody : validateTheatreRequestBody
};

module.exports = verifyTheatreReqBody;