import { useAuthContext } from "./useAuthContext"
import { useMovieWantContext } from "./useMovieWantContext"
import { useMovieWatchedContext } from "./useMovieWatchedContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch:wantDispatch } = useMovieWantContext()
    const { dispatch:watchDispatch } = useMovieWatchedContext()


    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        wantDispatch({type: 'SET_MOVIES', payload: null})
        watchDispatch({type: 'SET_MOVIES', payload: null})

    }

    return {logout}
}