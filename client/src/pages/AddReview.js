import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'


const AddReview = () => {

    const { user } = useAuthContext()


    const navigate = useNavigate()
    
    const[review, setReview] = useState(0)

    const[title, setTitle] = useState('')
    const[director, setDirector] = useState('')
    const[error, setError] = useState(null)


    const { id } = useParams()


    useEffect( () => {
        const checkValue = async () => {
            if(!user){
                return
            }

            const response = await fetch('/api/moviesWant/' + String(id), {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if(!response.ok){
                return navigate('/404')
            }
            
            const json = await response.json()

            if(response.ok){
                setTitle(json.title)
                setDirector(json.director)
            }
            else{
                return navigate('/404')
            }

        }

        checkValue()
        
        
    })

    const rate = async () => {

        if(!user){
            return
        }

        if(review < 0 || review > 5){
            setError("Number must be between 0 and 5!")
            return
        }

        const responseDel = await fetch('/api/moviesWant/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const jsonDel = await responseDel.json()

        if(!responseDel.ok){
            return jsonDel.error
        }

        const movie = {review, movie_id: jsonDel.movie_id}

        const responseAdd = await fetch('/api/moviesWatched/', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })


        const jsonAdd = await responseAdd.json()

        if(!responseAdd.ok){
            return jsonAdd.error
        }

        return navigate('/watched')
    }

    const stop = () => {
        return navigate('/')
    }

    return (
        <div className="review-details">
            <div className='inside-contents'>
                <h4>
                    {title}
                </h4>
                <p>
                <strong>Director: </strong>{director}

                </p>
                <p>
                    {/* <strong><a href={page}>
                        Movie IMDB site
                    </a></strong> */}
                </p>
            </div>
            <div className="value-insert">
                <h4>
                    Review:
                </h4>
                <input 
                    type='number'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    className={(review > 5 || review < 0) ? 'error' : ''}
                />
                {error && <div className='error'>{error}</div>}
            </div>
            <div className="review-buttons">
                <span className="material-symbols-outlined" id='review-watch' onClick={rate}>check_circle</span>

                <span className="material-symbols-outlined" id='review-delete' onClick={stop}>cancel</span>
            </div>

        </div>
    )
}

export default AddReview