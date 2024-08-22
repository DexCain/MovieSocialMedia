require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const watchedMoviesRoutes = require('./routes/movieWatchedRoutes')
const wantMoviesRoutes = require('./routes/movieWantedRoutes')
const userRoutes = require('./routes/user')
const checkMovieRoutes = require('./routes/checkMovieRoutes')
const friendsRoutes = require('./routes/friendRoutes')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

app.use('/api/check', checkMovieRoutes)

app.use('/api/moviesWatched', watchedMoviesRoutes)

app.use('/api/moviesWant', wantMoviesRoutes)

app.use('/api/user', userRoutes)

app.use('/api/friends', friendsRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
