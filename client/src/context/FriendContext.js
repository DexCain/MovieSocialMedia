import { createContext, useReducer } from "react";

export const FriendContext = createContext()

export const movieReducer = (state, action) => {
    switch(action.type){
        case 'SET_FRIENDS':
            return{
                friends: action.payload
            }
        case 'ADD_FRIEND':
            return{
                friends: [action.payload, ...state.friends]
            }
        case 'DELETE_FRIEND':
            return{
                friends: state.friends.filter((m) => m.friend_username !== action.payload.friend_username)
            }
        default:
            return state
    }
}

export const FriendContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(movieReducer, {
        friends: null
    })

    return (
        <FriendContext.Provider value={{...state, dispatch}}>
            { children }
        </FriendContext.Provider>
    )
}