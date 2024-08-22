import { FriendContext } from "../context/FriendContext";
import { useContext } from 'react'

export const useFriendContext = () => {
    //This gets us both of 
    const context = useContext(FriendContext)

    if (!context){
        throw Error('useFriendContext must be used inside an FriendContextProvider')
    }

    return context
}