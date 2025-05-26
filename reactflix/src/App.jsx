import MovieCard from './components/MovieCard';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';


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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
        : `${API_BASE_URL}/movie/popular?language=en-US&page=1`;
      // If the query is empty, fetch popular movies
      // Otherwise, fetch movies based on the search term

      const response = await fetch(endpoint, API_OPTIONS);
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
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
          <h2>{searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}</h2>
          {isLoading ? (
            <p className='text-white'>Loading...</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              { movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
export default App