import { useMovieWatchedContext } from "../hooks/useMovieWatchedContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from 'react'


const MovieWatchedDetails = ( { movie } ) => {

    const { user } = useAuthContext()

    const {dispatch} = useMovieWatchedContext()

    var url = "https://www.imdb.com/title/" + String(movie.movie.imdb_id)

    const handleClick = async () => {

        if(!user){
            return
        }

        const response = await fetch('/api/moviesWatched/' + movie._id, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_MOVIE', payload: json})
        }

    }

    return(
        <div className="watched-movie-details">
            <h4>
                {movie.movie.title}
            </h4>
            <p>
                <strong>Director: </strong>{movie.movie.director}
            </p>
            <span><a href={url} target="_blank">IDMB Page</a></span>
            <div className="rating">
                My Rating: {movie.review}/5
            </div>
        </div>
    )
}

export default MovieWatchedDetails