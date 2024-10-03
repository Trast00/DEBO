import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'

const AuthErrorModal = ({onClose}) => {
  const { isAuthenticated, logout, isLoading } = useAuth0();
  return (
    <>
      <div className="modal custom-modal" id="authErrorModal" aria-labelledby="authErrorModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-primary-dark" id="authErrorModalLabel">Authentification | Connexion</h4>
              <button type="button" className="btn-close" onClick={_ => onClose()} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              { (isLoading) &&
                <>
                  <p>Connexion en cour, Veuillez patientez</p>
                </>
              }
              { (isAuthenticated) &&
                <>
                  <p>Vous êtes connecté</p>
                </>
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn button-default button-reversed" data-bs-dismiss="modal">Fermer</button>
              <button type="button" className="btn button-default" data-bs-dismiss="modal" onClick={logout}>Se deconnecter</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthErrorModal
