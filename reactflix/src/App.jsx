import Search from './components/Search';
import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />
      <h1>Movie Search</h1>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Image" />
          <h1>Find <span className="text-gradient">Movies</span>You Love without <span className="text-gradient">Worry</span></h1>
        </header>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </main>
  )
}
export default App