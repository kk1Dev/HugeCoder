

const theatreController = require('../controllers/theatre.controller')
const { verifyTheatreReqBody } = require('../middlewares')

module.exports = function (app){
console.log("i am at therate route")
    app.get('/mba/api/theatres',theatreController.getAllTheatres)
    app.get('/mba/api/theatre/:id',theatreController.getTheatre)
    app.post('/mba/api/theatre/create',[verifyTheatreReqBody.validateTheatreRequestBody],theatreController.createTheatre)
    app.put('/mba/api/theatre/update/:id',[verifyTheatreReqBody.validateTheatreRequestBody],theatreController.updateTheatre)
    app.delete('/mba/api/theatre/delete/:id',theatreController.deleteTheatre)
    app.put('/mba/api/theatre/:id/movies',theatreController.putMoviesToATheatre)
    app.get('/mba/api/theatre/:theatreId/movies/:movieId',theatreController.checkMovieInTheatre)
}