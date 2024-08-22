import { useFriendContext } from "../hooks/useFriendContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import MovieWatchedDetails from "./movieWatchedDetails"


const FriendDetails = ( { friend } ) => {
    
    const { dispatch } = useFriendContext()
    const { user } = useAuthContext()

    const [ ratedMovies, setRatedMovies ] = useState(null)
    const [ recMovies, setRecMovies ] = useState(null)

    const handleClick = async () => {

        if(!user){
            return
        }
        const response = await fetch('/api/friends/' + friend.friend_username, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })



        const json = await response.json()


        if(response.ok){
            dispatch({type: 'DELETE_FRIEND', payload: json})
        }

    }

    const topMovies = async () => {

        setRecMovies(null)

        if(!user){
            return
        }

        const response = await fetch('/api/friends/top/' + friend.friend_username, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        console.log(json)


        setRatedMovies(json)


        console.log(ratedMovies)
    }

    const recentMovies = async () => {

        setRatedMovies(null)

        if(!user){
            return
        }

        const response = await fetch('/api/friends/recent/' + friend.friend_username, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        setRecMovies(json)
    }


    const hide = async () => {
        setRatedMovies(null)
        setRecMovies(null)
    }


    return(
        <div className="movie-details">
            <h4>
                {friend.friend_username}
            </h4>
            <button onClick={topMovies}>
                {friend.friend_username} Top Movies
            </button>
            <button onClick={recentMovies}>
                {friend.friend_username} Recent Movies
            </button>
            <button onClick={hide}>
                Hide Movies
            </button>
            <span className="material-symbols-outlined" id='delete' onClick={handleClick}>delete</span>
            <div/>

            <div className="friend-movies">
                {recMovies && recMovies.map((movie) => (
                    <MovieWatchedDetails key={movie.movie._id} movie={movie} />
                ))}

                {ratedMovies && ratedMovies.map((movie) => (
                    <MovieWatchedDetails key={movie.movie._id} movie={movie} />
                ))}

            </div>


        </div>
    )
}

export default FriendDetails