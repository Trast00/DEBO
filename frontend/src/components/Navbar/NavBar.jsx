import React, { useState } from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      <header>
        <div className="logo"></div>
        <div className="nav-menu">
          {!isOpen? (<button className="btn-menu show-menu" onClick={()=> setIsOpen(true)}>☰</button>)
          :(<button className="btn-menu close-menu" onClick={()=> setIsOpen(false)}>✖</button>)}
          
          <ul className={isOpen? "show" :  "hidden"}>
            <li>
              { isAuthenticated 
              ? <button onClick={() => {logout({returnTo: window.location.origin})}}>Logout</button>
              : <button onClick={loginWithRedirect}>Connexion/Inscription</button>
              }
            </li>
            <li>
              <NavLink to="/">Services</NavLink>
            </li>

            <li>
              <NavLink to="/payement">Tarifs</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contactes</NavLink>
            </li>
            <li>
              <NavLink to="/payement">S'abonner à un essaie gratuit</NavLink>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default NavBar