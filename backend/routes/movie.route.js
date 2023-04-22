const movieController = require('../controllers/movie.controller')
const {verifyMovieReqBody} = require('../middlewares')
//Routes for the movie

module.exports = function (app) {
console.log("i am at movie route")
    app.get('/mba/api/movies',movieController.getAllMovies)
    app.get('/mba/api/movies/:id',movieController.getMoviesById).delete(movieController.deleteMovie)
    app.post('/mba/api/movies/create',[verifyMovieReqBody.validateMovieRequestBody],movieController.createMovie)
    app.put('/mba/api/movie/update/:id',[verifyMovieReqBody.validateMovieRequestBody],movieController.updateMovie)
    .delete('/mba/api/movies/:id',movieController.deleteMovie)
    
}
