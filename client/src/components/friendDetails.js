import { useFriendContext } from "../hooks/useFriendContext"
import { useAuthContext } from "../hooks/useAuthContext"


const FriendDetails = ( { friend } ) => {
    
    const {dispatch} = useFriendContext()

    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user){
            return
        }

        const theFriend = {friend_user: friend.friend_username}

        console.log(friend.friend_username)

        const response = await fetch('/api/friends/' + friend.friend_username, {
            method: 'DELETE',
            body: JSON.stringify(theFriend),
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })



        const json = await response.json()


        if(response.ok){
            dispatch({type: 'DELETE_FRIEND', payload: json})
        }

    }

    return(
        <div className="movie-details">
            <h4>
                {friend.friend_username}
            </h4>
            <button>
                {friend.friend_username} Top Movies
            </button>
            <button>
                {friend.friend_username} Recent Movies
            </button>
            <span className="material-symbols-outlined" id='delete' onClick={handleClick}>delete</span>
            <div/>
        </div>
    )
}

export default FriendDetails