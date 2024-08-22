import { createContext, useReducer } from "react";

export const MovieWatchedContext = createContext()

export const movieReducer = (state, action) => {
    switch(action.type){
        case 'SET_MOVIES':
            return{
                movies: action.payload
            }
        case 'ADD_MOVIE':
            return{
                movies: [action.payload, ...state.movies]
            }
        default:
            return state
    }
}

export const MovieWatchedContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(movieReducer, {
        movies: null
    })

    return (
        <MovieWatchedContext.Provider value={{...state, dispatch}}>
            { children }
        </MovieWatchedContext.Provider>
    )
}