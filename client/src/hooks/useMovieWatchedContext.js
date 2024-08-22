import { MovieWatchedContext } from "../context/MovieWatchedContext";
import { useContext } from 'react'

export const useMovieWatchedContext = () => {
    //This gets us both of 
    const context = useContext(MovieWatchedContext)

    if (!context){
        throw Error('useMovieContext must be used inside an MovieContextProvider')
    }

    return context
}