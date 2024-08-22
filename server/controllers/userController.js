const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Creating the JWT validation token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// Logging the user in
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        // create jwt token
        const token = createToken(user._id)

        res.status(200).json({email, token, username: user.username})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Signing up the user
const signupUser = async (req, res) => {
    
    const {email, username, password} = req.body
    try{
        const user = await User.signup(email, username, password)

        // create the token
        const token = createToken(user._id)

        res.status(200).json({email, token, username: user.username})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}