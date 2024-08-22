import { useState } from 'react'
import { useMovieWantContext } from '../hooks/useMovieWantContext'
import { useAuthContext } from '../hooks/useAuthContext'


const MovieForm = () => {
    const {dispatch} = useMovieWantContext()
    const[inTitle, setInTitle] = useState('')

    const[id, setID] = useState('')
    const[title, setTitle] = useState('')
    const[director, setDirector] = useState('')
    const[posterURL, setPosterURL] = useState('')

    const[showConf, setShowConfirm] = useState(null)
    const[error, setError] = useState(null)
    const { user } = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        
        if(!user){
            setError('You must be logged in')
            return 
        }
        
        const response = await fetch('/api/check/title/' + inTitle, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        
        const json = await response.json()
            //Some error in the below if statement
        if(!response.ok){
            setError(json.error)
            setShowConfirm(null)
        }
        
        else{
            setError(null)
            setTitle(json.title)
            setDirector(json.director)
            setPosterURL(json.poster_url)
            setShowConfirm(true)
            setID(json._id)
        }
        
    }

    const handleSubmitConfirm = async (e) => {
        e.preventDefault()


        if(!user){
            setError('You must be logged in')
            return 
        }

        if(id ==='') {
            setError('Selection did not save. Try Again!')
            return
        }

        const movie = {movie_id: id}

        const response = await fetch('/api/moviesWant/', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setShowConfirm(null)
        }
        else {
            setShowConfirm(null)
            setTitle('')
            setDirector('')
            setPosterURL('')
            dispatch({type: 'CREATE_MOVIE', payload: json})
        }
    }

    return(
        <div>
        {!showConf && 
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Movie</h3>

            <label>Movie Title</label>
            <input 
                type='text'
                onChange={(e) => setInTitle(e.target.value)}
                value={inTitle}
            />

            <button disabled={showConf !== null}>Search for Movie</button>
            {error && <div className='error'>{error}</div>}

            
        </form>
        }
        {showConf && <form onSubmit={handleSubmitConfirm}>
                <h3>Title: {title}</h3>
                <h4>Director: {director}</h4>
                
                <img src={posterURL} alt="Poster of the movie" />
                
                <button>Confirm Selection</button>
            </form>}
        </div>
    )
}

export default MovieForm