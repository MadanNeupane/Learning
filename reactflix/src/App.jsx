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

  const fetchMovies = async (query) => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(`${endpoint}&query=${encodeURIComponent(query)}`, API_OPTIONS);
      console.log(`Fetching movies for query: ${query}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.results);
    } catch (error) {
      console.error('Fetch error:', error);
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
          <div className="movies">
            {errorMessage && <p className="error">{errorMessage}</p>}
            {!errorMessage && searchTerm && (
              <p className="results">Showing results for "{searchTerm}"</p>
            )}
            {/* Movie cards will be rendered here */}
          </div>
        </section>
      </div>
    </main>
  )
}
export default App