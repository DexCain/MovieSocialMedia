import { MovieWantContext } from "../context/MovieWantContext";
import { useContext } from 'react'

export const useMovieWantContext = () => {
    //This gets us both of 
    const context = useContext(MovieWantContext)

    if (!context){
        throw Error('useMovieContext must be used inside an MovieContextProvider')
    }

    return context
}