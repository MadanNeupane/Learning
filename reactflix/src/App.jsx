import MovieCard from './components/MovieCard';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Spinner from './components/Spinner';
import { updateSearchCount, getTrendingMovies } from './appwrite';


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
  const [trendingMovies, setTrendingMovies] = useState([]);
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
      if(query && data.results && data.results.length > 0) {
        // If a search term is provided and results are found, update the search count
        const movie = data.results[0]; // Use the first result for counting
        await updateSearchCount(query, movie);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getTrendingMovies();
      if (response && response.length > 0) {
        setTrendingMovies(response);
      } else {
        setErrorMessage('No trending movies found.');
      }
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      setErrorMessage('Failed to fetch trending movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <h1>Movie Search</h1>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Image" />
          <h1>Find <span className="text-gradient">Movies</span>You Love without <span className="text-gradient">Hassle</span></h1>
        </header>

        { trendingMovies.length > 0 && (
          <section className="trending">
            <h2 className="">Trending Movies</h2>
            <ul className='mt-4'>
              { trendingMovies.map((movie, index) => (
                <li key={movie.$id} className="trending-movie">
                  <p>{ index + 1 }</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h2>{searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}</h2>
          {isLoading ? (
            <Spinner />
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