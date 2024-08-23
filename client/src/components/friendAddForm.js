import { useState } from 'react'
import { useFriendContext } from '../hooks/useFriendContext'
import { useAuthContext } from '../hooks/useAuthContext'


const FriendAddForm = () => {
    const {dispatch} = useFriendContext()

    const[friendUser, setFriendUser] = useState('')

    const[error, setError] = useState(null)
    const { user } = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return 
        }

        if(friendUser === ''){
            setError('Fill in username field')
            return
        }

        const friend = {friend_user: friendUser}
        
        const response = await fetch('/api/friends/', {
            method: 'POST',
            body: JSON.stringify(friend),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        
        const json = await response.json()
            //Some error in the below if statement
        if(!response.ok){
            setError(json.error)
        }
        
        else{
            setError(null)
            dispatch({type: 'ADD_FRIEND', payload: json})
        }
        
    }


    return(
        <div> 
            <form className='create' onSubmit={handleSubmit}>
                <h3>Add a Friend</h3>

                <label>Username</label>
                <input 
                    type='text'
                    onChange={(e) => setFriendUser(e.target.value)}
                    value={friendUser}
                />

                <button className='confirm'>Add Friend</button>
                {error && <div className='error'>{error}</div>}

                
            </form>
        </div>
    )
}

export default FriendAddForm