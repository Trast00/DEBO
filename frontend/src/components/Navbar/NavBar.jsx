import React, { useState } from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <header>
        <div className="logo"></div>
        <div className="nav-menu">
          {!isOpen? (<button className="show-menu" onClick={()=> setIsOpen(true)}>☰</button>)
          :(<button className="close-menu" onClick={()=> setIsOpen(false)}>✖</button>)}
          
          
          <ul className={isOpen? "show" :  "hidden"}>
            <li>
              <NavLink to="/auth">Connexion/Inscription</NavLink>
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