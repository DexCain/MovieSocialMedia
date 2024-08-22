import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react'

export const useAuthContext = () => {
    //This gets us both of 
    const context = useContext(AuthContext)

    if (!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}