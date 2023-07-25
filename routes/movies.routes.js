const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET route to display the form
router.get('/movies/create', (req, res, next) => {
    Celebrity
            .find()
            .then(allCelebrities => {
                res.render('movies/new-movie', {celebrities: allCelebrities});
            })
            .catch(error => {
                console.log(error);
                res.redirect('/movies/create');
            });
});

// POST route to save a new celebrity to the database
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie
            .create ({ title, genre, plot, cast })
            .then (() => res.redirect ('/movies/create'))
            .catch (error => next (error))
});

// GET route to display show all movies

router.get('/movies', (req, res, next) => {
    Movie
           .find()
           .then(allMovies => {
            console.log ('Retrieved Movies from DB', allMovies);
            res.render('movies/movies', {movies: allMovies});
           })
           .catch (error => {
            console.log('Error while getting the Movies from the DB: ', error);
            next (error);
           });
})

// GET route to retrieve and display details of a specific movie
router.get('/movies/:movieId', (req, res,) => {
    const { movieId } = req.params;

    Movie
        .findById(movieId)
        .populate("cast")
        .then(theMovie => res.render('movies/movie-details', {movie: theMovie}))
        .catch(error => {
            console.log('Error while retrieving movie details: ', error);
            next(error);
        });
});

// POST route to delete a movie
router.post ("/movies/:movieId/delete", (req, res, next) => {
    const { movieId } = req.params;
    console.log(movieId);

    Movie
        .findByIdAndRemove(movieId)
        .then(() => res.redirect('/movies'))
        .catch(error => {
            console.log("Error while deleting a movie details: ", error);
            next(error);
        });
});

// GET route to update a movie
router.get('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params;

    Movie
        .findById(movieId)
        .then(movieToEdit => {
            res.render('movies/edit-movie', { movie: movieToEdit });
        })
        .catch(error => {
            console.log('Error while retrieving movie to update: ', error);
            next(error);
        });
});

// POST route to display the form to update a specific movie
router.post ("/movies/:movieId/edit", (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;

    Movie
        .findByIdAndUpdate(movieId, { title, genre, plot, cast}, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
        .catch(error => {
            console.log("Error while updating a movie: ", error);
            next(error);
        });
});

module.exports = router;