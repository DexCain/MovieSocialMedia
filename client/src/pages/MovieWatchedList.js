import { useEffect } from 'react'
import { useMovieWatchedContext } from '../hooks/useMovieWatchedContext'


//components
import MovieWatchedDetails from '../components/movieWatchedDetails'
import { useAuthContext } from '../hooks/useAuthContext'

const MovieWatchedList = () => {

    const { movies, dispatch } = useMovieWatchedContext()


    const { user } = useAuthContext()

    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch('/api/moviesWatched', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_MOVIES', payload: json})
            }
        }

        if(user){
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="MovieWantList">
            <div className="wantMovies">
                <h3>
                    Movie Watched List
                </h3>
                {movies && movies.map((movie) => (
                    <MovieWatchedDetails key={movie.movie._id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default MovieWatchedList