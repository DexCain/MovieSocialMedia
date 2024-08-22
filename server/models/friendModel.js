const mongoose = require('mongoose')

const Schema = mongoose.Schema


// Defines a Schema for the person to send friend requests, and maintain friends
const friendSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    friend_id:{
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Friend', friendSchema)