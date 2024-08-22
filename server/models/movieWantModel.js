const mongoose = require('mongoose')

const Schema = mongoose.Schema

// This simply connects the users want request to the movie, so we store the want request with an id reference to the specific movie
const movieWantSchema = new Schema({
    movie_id:{
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('MovieWant', movieWantSchema)