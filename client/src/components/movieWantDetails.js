import { useMovieWantContext } from "../hooks/useMovieWantContext"
import { useAuthContext } from "../hooks/useAuthContext"



const MovieWantDetails = ( { movie } ) => {

    const {dispatch} = useMovieWantContext()

    const { user } = useAuthContext()

    var url = "https://www.imdb.com/title/" + String(movie.movie.imdb_id)

    const handleClick = async () => {

        if(!user){
            return
        }

        const response = await fetch('/api/moviesWant/' + String(movie.userMovieID), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })



        const json = await response.json()


        if(response.ok){
            dispatch({type: 'DELETE_MOVIE', payload: json})
        }

    }

    return(
        <div className="movie-details">
            <h4>
                {movie.movie.title}
            </h4>
            <p>
                <strong>Director: </strong>{movie.movie.director}
            </p>
            <p>
                <strong><a target="_blank" href={url}>
                    IMDB Page
                </a></strong>
            </p>
            <span className="material-symbols-outlined" id='delete' onClick={handleClick}>delete</span>
            <div/>
            <a href={'/review/' + movie.userMovieID}><span className="material-symbols-outlined" id='watch'>check_circle</span></a>
        </div>
    )
}

export default MovieWantDetails