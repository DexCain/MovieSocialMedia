const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Again this is simply a schema to pair a movie someone watched and reviewed to the specific movie id.
const movieWatchedSchema = new Schema({
    movie_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    review: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('MovieWatched', movieWatchedSchema)