import { useFriendContext } from "../hooks/useFriendContext"
import { useAuthContext } from "../hooks/useAuthContext"


const FriendDetails = ( { friend } ) => {
    
    const {dispatch} = useFriendContext()

    const { user } = useAuthContext()

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
    }

    const recentMovies = async () => {

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
            <span className="material-symbols-outlined" id='delete' onClick={handleClick}>delete</span>
            <div/>
        </div>
    )
}

export default FriendDetails