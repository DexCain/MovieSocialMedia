import { createContext, useReducer } from "react";

export const MovieWantContext = createContext()

export const movieReducer = (state, action) => {
    switch(action.type){
        case 'SET_MOVIES':
            return{
                movies: action.payload
            }
        case 'CREATE_MOVIE':
            return{
                movies: [action.payload, ...state.movies]
            }
        case 'DELETE_MOVIE':
            return{
                movies: state.movies.filter((m) => m.userMovieID !== action.payload._id)
            }
        default:
            return state
    }
}

export const MovieWantContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(movieReducer, {
        movies: null
    })

    return (
        <MovieWantContext.Provider value={{...state, dispatch}}>
            { children }
        </MovieWantContext.Provider>
    )
}