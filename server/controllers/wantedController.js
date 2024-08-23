const Movie = require('../models/movieModel')
const MovieWant = require('../models/movieWantModel')
const MovieWatched = require('../models/movieWatchedModel')

const mongoose = require('mongoose')

const newWantedMovieAdd = async (req, res) => {
    const {movie_id} = req.body

    if(!mongoose.Types.ObjectId.isValid(movie_id)){
        return res.status(404).json({ error: 'No such movie'})
    }

    const movie = await Movie.findOne({ _id: movie_id })

    if(!movie){
        return res.status(404).json({ error: 'No such movie, try again!'})
    }


    

    try {
        const user_id = req.user._id

        const checkDup = await MovieWant.findOne({movie_id, user_id: user_id.toString()})


        if(checkDup){
            res.status(400).json({error: 'Already Added'})
            return
        }

        const checkWatch = await MovieWatched.findOne({movie_id, user_id})

        if(checkWatch){
            res.status(400).json({error: 'Already Watched'})
            return
        }

        const userMovie = await MovieWant.create({ movie_id, user_id })
        res.status(200).json({userMovieID: userMovie._id, movie: movie})
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    
}

const getWantedMovies = async (req, res) => {

    const user_id = req.user._id
    
    const movies = await MovieWant.find({ user_id }).sort({createdAt: 1})

    // After getting all of the movies, we rather need to get their stored information
    let fullMovieList = []

    for (let i = 0; i < movies.length; i++) {
        const fullMovie = await Movie.findById({ _id: movies[i].movie_id })

        fullMovieList.push({userMovieID: movies[i]._id, movie: fullMovie})

    }
    
    res.status(200).json(fullMovieList)
}


const getWantedMovie = async (req, res) => {

    const user_id = req.user._id

    const { id } = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such movie'})
    }

    const movie = await MovieWant.findOne({ _id: id, user_id})

    if(!movie) {
        return res.status(400).json({error: "Movie wasn't defined"})
    }

    const fullMovie = await Movie.findById({ _id: movie.movie_id })


    if(!movie){
        return res.status(404).json({ error: 'No such movie'})
    }

    res.status(200).json(fullMovie)

}

const deleteWantMovie = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such movie'})
    }

    const movie = await MovieWant.findOneAndDelete({_id: id})

    if(!movie){
        return res.status(404).json({error: 'No such movie'})
    }

    res.status(200).json(movie)
}


module.exports = {
    getWantedMovies,
    getWantedMovie,
    deleteWantMovie,
    newWantedMovieAdd
}

