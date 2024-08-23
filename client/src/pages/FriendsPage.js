import { useEffect } from 'react'
import { useFriendContext } from '../hooks/useFriendContext'
import { useAuthContext } from '../hooks/useAuthContext'
import FriendDetails from '../components/friendDetails'
import FriendAddForm from '../components/friendAddForm'


const FriendsPage = () => {

    const { friends, dispatch } = useFriendContext()

    const { user } = useAuthContext()

    useEffect(() => {

        const fetchFriends = async () => {
            const response = await fetch('/api/friends/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            
            if(response.ok) {
                dispatch({type:'SET_FRIENDS', payload: json})
            }
        }


        if(user){
            fetchFriends()
        }
    }, [dispatch, user])

    // const handleSubmitSearch = async (e) => {



        
    // }

    return (
        <main>
            {/* <div for="friendUserInput" class="friend-search">
                <label>Search for Friends By Username</label>
                <input onCLick="handleSubmitSearch()" type="text" name="friendUser" id="friendUserInput"></input>
            </div> */}

            <div className="friend-grid-container">

            <FriendAddForm />

                <div className="friend-element">
                    {friends && friends.map((friend) => (
                        <FriendDetails key={friend.friend_username} friend={friend}/>
                    ))}
                </div>


            </div>


        </main>
    )
}

export default FriendsPage