import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Error from './pages/error/Error';
import Profiles from './pages/profile/Profiles';
import About from './pages/about/About';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profiles/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>

        <Footer/>

      </div>
    </Router>
  );
}

export default App;
