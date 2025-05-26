const MovieCard = ({movie}) => {
  return (
    <div className="movie-card">
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no-movie.png'} alt={movie.title} className="w-full h-auto rounded-lg" />
        <h3 key={movie.id} className="text-white text-lg font-bold mt-2">{movie.title}</h3>

        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="Star" />
                <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span>&nbsp;|&nbsp; {movie.original_language.toUpperCase()}</span>
            <span>&nbsp;|&nbsp; {new Date(movie.release_date).getFullYear()}</span>
        </div>
    </div>
  )
}
export default MovieCard