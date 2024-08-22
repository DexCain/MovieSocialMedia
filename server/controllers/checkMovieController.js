const Movie = require('../models/movieModel')
const axios = require('axios')


// Getting a movie from the database or api by title
const checkMovieByTitle = async (req, res) => {
        
    try{
        const { title } = req.params

        // Checking if its a duplicate, but based on the passed in name
        const databaseMovie = await Movie.findOne({title})

        // Determines if the movie is in the database, and returns the movie if it is
        
        if(databaseMovie){
            return res.status(200).json(databaseMovie)
        }

        // Get The Movie from the API by Title
        const request = await axios
        .get("http://www.omdbapi.com/?apikey=" + String(process.env.OMDB_API_KEY) + "&t=" + String(title))
        .then(response => {

            if(!response){
                return 'Internal API Server Error'
            }

            return response.data
        })
        .catch((err) => {console.log(err)})


        const {Title, Director, imdbID, Ratings, Genre, Poster} = request

        // Double Checking on the final ID
        const databaseMovie2 = await Movie.findOne({imdb_id: imdbID})

        if(databaseMovie2){
            return res.status(200).json(databaseMovie2)
        }

        let rate = ""

        if(typeof Ratings !== 'undefined' && Ratings !== null){

            console.log(Ratings)
            for(rates of Ratings){
                if(rates.Source == "Rotten Tomatoes"){
                    rate = rate.concat(rates.Value)
                }
            
            }
        }

        

        if(rate == ""){
            rate = "NO RATING"
        }

        const movie = await Movie.create({title: Title, director: Director, imdb_id: imdbID, toms_review: rate, genres: Genre, poster_url: Poster})

        if(!movie){
            return res.status(400).json({error: "Unable to find that movie!"})
        }

        return res.status(200).json(movie)
    } catch(error){
        return res.status(404).json({error: "Unable to find a movie with that title"})
    }
}

// Getting a movie from the database or api based on imdb id
const checkMovieByID = async (req, res) => {
        

    const { imdb_id } = req.params

    const databaseMovie = await Movie.find({imdb_id})

    // Determines if the movie is in the database, and returns the movie if it is
    if(databaseMovie){
        return res.status(200).json(databaseMovie)
    }

    // Get The Movie from the API by Title
    const request = await axios
    .get("http://www.omdbapi.com/?apikey=" + String(process.env.OMDB_API_KEY) + "&i=" + String(imdb_id))
    .then(response => {

        if(!response){
            return 'Internal API Server Error'
        }

        return response.data
    })
    .catch((err) => {console.log(err)})

    const {Title, Director, imdbID, Ratings, Genre, Poster} = request


    let rate = ""
    for(rates of Ratings){
        if(rates.Source == "Rotten Tomatoes"){
            rate = rate.concat(rates.Value)
        }
    
    }

    if(rate == ""){
        rate = "NO RATING"
    }

    const movie = await Movie.create({title: Title, director: Director, imdb_id: imdbID, toms_review: rate, genres: Genre, poster_url: Poster})

    if(!movie){
        return res.status(400).json({error: "Unable to find that movie!"})
    }

    return res.status(200).json(movie)
}

module.exports = {
    checkMovieByTitle,
    checkMovieByID
}