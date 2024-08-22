const express = require('express')

const{
    getFriends,
    addFriend,
    deleteFriend,
    getFriendTopMovies,
    getFriendRecentMovies
} = require('../controllers/friendController')

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

//require auth for all friend routes
router.use(requireAuth)

router.get('/', getFriends)

router.post('/', addFriend)

router.delete('/:user', deleteFriend)

router.get('/top/:user', getFriendTopMovies)

router.get('/recent/:user', getFriendRecentMovies)


module.exports = router