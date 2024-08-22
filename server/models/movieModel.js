const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Creating the base Movie Schema, so that when two people reference the same movie, they correspond to the same id
const movieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    imdb_id: {
        type: String,
        required: true
    },
    toms_review: {
        type: String,
        required: true
    },
    poster_url: {
        type: String,
        required: true
    },
    genres: [String]
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)