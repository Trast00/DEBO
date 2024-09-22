import React, { useState } from 'react'
import './NavBar.css'
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = ({userData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const location = useLocation();
  return (
    <div>
      <header>
        <NavLink to="/" className="logo d-flex">
          <img src="/images/logowhite_2.png" alt="logo white" />
          <h1>Debo Service</h1>
        </NavLink>
        <div className="nav-menu">
          {!isOpen? (<button className="btn-menu show-menu" onClick={()=> setIsOpen(true)}>☰</button>)
          :(<button className="btn-menu close-menu" onClick={()=> setIsOpen(false)}>✖</button>)}
          
          <ul className={isOpen? "show" :  "hidden"}>
            <li>
              { !isAuthenticated &&
                <button onClick={loginWithRedirect}>Connexion/Inscription</button>
              }
            </li>
            {(userData && userData.isPremuim) && 
            <li>
                <NavLink to="/tenders" activeClassName="active-link" className={location.pathname === "/" ? "active-link" : ""}>Voir toutes les offres</NavLink>
            </li>}
            <li>
                <NavLink to="/" activeClassName="active-link" className={location.pathname === "/" ? "active-link" : ""}>Services</NavLink>
            </li>
            {/*<li>
                <NavLink to="/payment" activeClassName="active-link" className={location.pathname === "/payment" ? "active-link" : ""}>Tarifs</NavLink>
            </li>*/}
            <li>
                <NavLink to="/contact" activeClassName="active-link" className={location.pathname === "/contact" ? "active-link" : ""}>Contactes</NavLink>
            </li>
            {/*(!isAuthenticated || !user || !user.isPremuim) && */}
            <li>
                <NavLink to="/payment" activeClassName="active-link" className={location.pathname === "/payment" ? "active-link" : ""}>S'abonner</NavLink>
            </li>
            {isAuthenticated &&
              <li>
                <button onClick={() => {logout({returnTo: window.location.origin})}}>Déconnnexion</button>
              </li>
            }
          </ul>
        </div>
      </header>
    </div>
  )
}

export default NavBar