const User = require('../models/userModel')
const Friend = require('../models/friendModel')
const MovieWant = require('../models/movieWantModel')
const MovieWatched = require('../models/movieWatchedModel')

const getFriends = async (req, res) => {
    const user_id = req.user._id

    try{
        const friends = await Friend.find({user_id}).sort({createdAt: 1})
        
        // After getting all the friend entries, we need to get the friends usernames

        let friendsUsers = []

        for(let i = 0; i < friends.length; i++) {
            const friend = await User.findById({_id: friends[i].friend_id})

            friendsUsers.push({friend_username: friend.username})
        }

        res.status(200).json(friendsUsers)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const addFriend = async (req, res) => {
    const {friend_user} = req.body

    const friend = await User.findOne({username: friend_user})

    if(!friend){
        return res.status(404).json({error: 'No user with provided username'})
    }

    try {
        const user_id = req.user._id

        // Checking to ensure that you aren't adding yourself.
        if(user_id.toString() == (friend._id).toString()){
            res.status(400).json({error: 'Cannot be friends with yourself'})
            return
        }

        // Checking if this user is already friends with the other
        const checkExistingFriendship = await Friend.findOne({user_id, friend_id: friend._id})

        

        if(checkExistingFriendship){
            res.status(400).json({error: 'Already Friends'})
            return
        }

        

        await Friend.create({user_id, friend_id: friend._id})
        res.status(200).json({friend_username: friend.username})
    } catch (error){
        res.status(400).json({ error: error.message })
    }
}

const deleteFriend = async (req, res) => {
    const { user } = req.params

    const friend = await User.findOne({username: user})

    if(!friend){
        return res.status(404).json({error: 'No user with provided username'})
    }
    
    try{
        const user_id = req.user._id

        // Checking if this user is already friends with the other
        const checkExistingFriendship = await Friend.findOne({user_id, friend_id: friend._id})

        if(!checkExistingFriendship){
            res.status(400).json({error: 'You are not friends'})
            return
        }

        const friendship = await Friend.findOneAndDelete({_id: checkExistingFriendship._id})

        if(!friendship){
            return res.status(400).json({error: 'There was an error deleting your friend try again'})
        }

        res.status(200).json({friend_username: user})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

const getFriendTopMovies = async (req, res) => {
    const { user } = req.params

    const friend = await User.findOne({username: user})

    if(!friend){
        return res.status(404).json({error: 'No user with provided username'})
    }

    try{
        const user_id = req.user._id

        // Checking if this user is already friends with the other
        const checkExistingFriendship = await Friend.findOne({user_id, friend_id: friend._id})

        if(!checkExistingFriendship){
            res.status(400).json({error: 'You are not friends'})
            return
        }

        const movies = await MovieWatched.find({user_id: friend._id}).sort({review: -1}).limit(5)

        res.status(200).json({movies})
    } catch(error) {
        res.status(400).json({error: error.message})
    }


}

const getFriendRecentMovies = async (req, res) => {
    const { user } = req.params

    const friend = await User.findOne({username: user})

    if(!friend){
        return res.status(404).json({error: 'No user with provided username'})
    }

    try{
        const user_id = req.user._id

        // Checking if this user is already friends with the other
        const checkExistingFriendship = await Friend.findOne({user_id, friend_id: friend._id})

        if(!checkExistingFriendship){
            res.status(400).json({error: 'You are not friends'})
            return
        }

        const movies = await MovieWatched.find({user_id: friend._id}).sort({createdAt: 1}).limit(5)

        res.status(200).json({movies})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getFriends,
    addFriend,
    deleteFriend,
    getFriendTopMovies,
    getFriendRecentMovies
}