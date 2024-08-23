import { useEffect } from 'react'
import { useMovieWantContext } from '../hooks/useMovieWantContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import MovieWantDetails from '../components/movieWantDetails'
import MovieForm from '../components/movieForm'

const MovieWantList = () => {

    const { movies, dispatch } = useMovieWantContext()

    const { user } = useAuthContext()

    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch('/api/moviesWant/', {
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
                    Movie Wish List
                </h3>
                {movies && movies.map((movie) => (
                    <MovieWantDetails key={movie.movie._id} movie={movie} />
                ))}
                <div>End of Watch List</div>
            </div>
            <MovieForm />
        </div>
    )
}

export default MovieWantList