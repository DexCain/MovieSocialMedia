const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // first verify user auth

    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: "Authorization token required"})
    }

    // Getting the JWT using string split as the JWT is appended with Bearer
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not Authorized"})
    }
}

module.exports = requireAuth