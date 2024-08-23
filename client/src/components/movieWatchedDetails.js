const MovieWatchedDetails = ( { movie } ) => {


    var url = "https://www.imdb.com/title/" + String(movie.movie.imdb_id)


    return(
        <div className="watched-movie-details">
            <h4>
                {movie.movie.title}
            </h4>
            <p>
                <strong>Director: </strong>{movie.movie.director}
            </p>
            <span><a href={url} rel="noreferrer" target="_blank">IDMB Page</a></span>
            <div className="rating">
                My Rating: {movie.review}/5
            </div>
        </div>
    )
}

export default MovieWatchedDetails