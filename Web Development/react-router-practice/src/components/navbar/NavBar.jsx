import { NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (
    <div>
        <ul className='nav-link'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </ul>
    </div>
  )
}

export default NavBar