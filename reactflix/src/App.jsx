import Search from './components/Search';
import { useEffect, useState } from 'react';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(`${endpoint}&query=${encodeURIComponent(query)}`, API_OPTIONS);
      console.log(`Fetching movies for query: ${query}`);

      if (!response.ok) {
        setErrorMessage('Failed to fetch movies. Please try again later.');
      }
      const data = await response.json();
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Something went wrong.');
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <h1>Movie Search</h1>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Image" />
          <h1>Find <span className="text-gradient">Movies</span>You Love without <span className="text-gradient">Worry</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <p className='text-white'>Loading...</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <div className="movies">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div key={movie.id} className="movie">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                  </div>
                ))
              ) : (
                <p className='text-white'>No movies found.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
export default App