const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema



const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})



userSchema.statics.signup = async function(email, username, password){

    // First we need to validate that the fields were entered correctly

    if (!email || !username || !password){
        throw Error('All Fields required')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    // Now we check if there already exists a user with the email or username
    let exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }

    exists = await this.findOne({ username })

    if(exists){
        throw Error('Username already in use')
    }

    // Now using bcrypt, we encrypt the password by salting and hashing

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash })

    return user
}

userSchema.statics.login = async function(email, password) {

    if(!email || !password){
        throw Error('All fields required')
    }

    // Finding the user assosicated with the specific emaill
    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect Login')
    }

    // Seeing if the two passwords match

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Login')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)