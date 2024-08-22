const express = require('express')

const{
    getWantedMovies,
    newWantedMovieAdd,
    deleteWantMovie,
    getWantedMovie
} = require('../controllers/wantedController')

const requireAuth = require("../middleware/requireAuth")
const { newWatchedMovieAdd } = require('../controllers/watchedController')

const router = express.Router()

//require auth for all movie routes
router.use(requireAuth)

router.get('/', getWantedMovies)

router.get('/:id', getWantedMovie)

router.post('/', newWantedMovieAdd)

router.delete('/:id', deleteWantMovie)

module.exports = router