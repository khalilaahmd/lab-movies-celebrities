const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// const Movie = require("../models/Movie.model");

// GET route to display the form
router.get('/celebrities/create', (req, res, next) => res.render ('celebrities/new-celebrity'))

// POST route to save a new celebrity to the database
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity
            .create ({ name, occupation, catchPhrase })
            .then (() => res.redirect ('/celebrities/create'))
            .catch (error => next (error))
});

// GET route to display list of all celebrities

router.get('/celebrities', (req, res, next) => {
    Celebrity
           .find()
           .then(allCelebrities => {
            console.log ('Retrieved celebrities from DB', allCelebrities);
            res.render('celebrities/celebrities', {celebrities: allCelebrities});
           })
           .catch (error => {
            console.log('Error while getting the celebrities from the DB: ', error);
            next (error);
           });
})
module.exports = router;