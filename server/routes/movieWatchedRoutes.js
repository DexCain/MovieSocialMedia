const express = require('express')

const {
    getWatchedMovies,
    getWatchedMovie,
    newWatchedMovieAdd
  } = require('../controllers/watchedController')

  const requireAuth = require("../middleware/requireAuth")


const router = express.Router()

router.use(requireAuth)

router.get('/', getWatchedMovies)

router.get('/:id', getWatchedMovie)

router.post('/', newWatchedMovieAdd)

//router.patch('/:id', changeRating)

module.exports = router