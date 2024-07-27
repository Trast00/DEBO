import React, { useEffect } from 'react'
import './auth.css'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

const AuthCallBack = () => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (!isLoading && isAuthenticated) {
    setTimeout(() => {
      window.location.href = '/tenders'
    }, 3000)
  }

  return (
    <section className='auth'>
      <p>Vous serez rediregirez dans quelque seconde ...</p>
      <p>(You will be redirect in few seconds ...)</p>
      <NavLink to="/" className='button-default mt-3'>Retour (Back)</NavLink>
    </section>
  )
}

export default AuthCallBack
