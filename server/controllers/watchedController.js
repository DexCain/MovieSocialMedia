const Movie = require('../models/movieModel')
const MovieWatched = require('../models/movieWatchedModel')

const mongoose = require('mongoose')

const newWatchedMovieAdd = async (req, res) => {

    const {review, movie_id} = req.body

    if(!mongoose.Types.ObjectId.isValid(movie_id)){
        return res.status(404).json({ error: 'No such movie'})
    }

    const movie = await Movie.find({ _id: movie_id })

    if(!movie){
        return res.status(404).json({ error: 'No such movie'})
    }

    try {
        const user_id = req.user._id

        const userMovie = await MovieWatched.create({ movie_id, user_id, review })
        res.status(200).json(userMovie)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    
}

const getWatchedMovies = async (req, res) => {

    const user_id = req.user._id
    
    const movies = await MovieWatched.find({ user_id }).sort({createdAt: 1})

    // After getting all of the movies, we rather need to get their stored information
    let fullMovieList = []

    for (let i = 0; i < movies.length; i++) {
        const fullMovie = await Movie.findById({ _id: movies[i].movie_id })

        fullMovieList.push({userMovieID: movies[i]._id, review:movies[i].review, movie: fullMovie})

    }

    res.status(200).json(fullMovieList)
}

const getWatchedMovie = async (req, res) => {
    const { id } = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such movie'})
    }

    const movie = await MovieWatched.find({ _id: id })

    if(!movie){
        return res.status(404).json({ error: 'No such movie'})
    }

    res.status(200).json(movie)

}

const deleteWatchedMovie = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such movie'})
    }

    const movie = await MovieWatched.findOneAndDelete({_id: id})

    if(!movie){
        return res.status(404).json({error: 'No such movie'})
    }

    res.status(200).json(movie)
}


module.exports = {
    getWatchedMovies,
    getWatchedMovie,
    deleteWatchedMovie,
    newWatchedMovieAdd
}

