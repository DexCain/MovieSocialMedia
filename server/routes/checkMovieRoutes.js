const express = require('express')

const {
  checkMovieByTitle,
  checkMovieByID
  } = require('../controllers/checkMovieController')

  const requireAuth = require("../middleware/requireAuth")


const router = express.Router()

router.use(requireAuth)

router.get('/title/:title', checkMovieByTitle)

router.get('/id/:id', checkMovieByID)

module.exports = router