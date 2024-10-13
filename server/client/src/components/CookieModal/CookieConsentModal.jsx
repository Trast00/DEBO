import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import './CookieConsentModal.css';

const CookieBlockedModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const consent = getCookie('cookieConsent');
    if (!consent) {
      setIsOpen(true);
    } else {
      enableAuthentication();
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'true', 365);
    setIsOpen(false);
    enableAuthentication();
  };

  const enableAuthentication = async () => {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        console.log('Access Token:', token);
        fetchUserData(token);
      } else {
        // Attempt to silently authenticate
        await getAccessTokenSilently();
      }
    } catch (error) {
      // Handle errors that may occur due to blocked cookies
      if (error.error === 'login_required' || error.error === 'consent_required') {
        // Cookies might be blocked, or the user is not authenticated
        setCookiesBlocked(true);
        setIsOpen(true);
      } else if (error.error === 'interaction_required') {
        // User interaction is required (e.g., login)
        console.log('User interaction is required for authentication.');
      } else {
        console.error('Authentication error:', error);
      }
    }
  };

  const fetchUserData = async (token) => {
    const response = await fetch('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('User data:', data);
  };

  const setCookie = (name, value, days) => {
    Cookies.set(name, value, { expires: days });
  };

  const getCookie = (name) => {
    return Cookies.get(name);
  };

  const openCookieSettings = () => {
    window.open('/enable-cookies', '_blank');
  };

  if (!isOpen) return null;

  return (
<div className='modalOverlay cookies-modal'>
  <div className='modalContent modal-cookies-content'>
    <h2>{cookiesBlocked ? 'Les cookies sont désactivés' : 'Consentement aux cookies'}</h2>
    {cookiesBlocked ? (
      <>
        <div className='tuto'>
          <p>
            L'authentification nécessite les cookies, qui semblent être bloqués dans votre navigateur. Veuillez activer les cookies pour continuer.
          </p>
          <h5 className='pt-3 font-bold'>Suivez les instructions ci-dessous pour activer les cookies</h5>
          <p>Appuyez sur l'icône à gauche de l'URL du site pour afficher les informations du site (comme affiché dans la capture ci-dessous)</p>
          <img src="/images/tutos/cookies/CookiesTuto1.png" alt="Appuyez sur l'icône à gauche de l'URL du site" />
          <p className='pt-3 font-bold'>Appuyez sur "Cookies et données du site"</p>
          <img src="/images/tutos/cookies/CookiesTuto2.png" alt="Appuyez sur Cookies et données du site" />
          <p className='pt-3 font-bold'>Cochez "Autoriser les cookies"</p>
          <img src="/images/tutos/cookies/CookiesTuto3.png" alt="Cochez Autoriser les cookies" />
          <p className='pt-3'>
            Si toutes les étapes sont suivies correctement, les cookies devraient être autorisés et votre connexion/inscription devrait fonctionner. Maintenant, <span className='font-bold'>actualisez la page pour appliquer les changements</span>.
          </p>
        </div>
        <div className='d-flex justify-end justify-items-end gap-2 mt-3'>
          <button onClick={_ => {setIsOpen(false); window.location = "/contact"}} className='button-default button-reversed'>
            Contactez-nous
          </button>
          <button onClick={_ => setIsOpen(false)} className='button-default'>
            Retour
          </button>
        </div>
      </>
    ) : (
      <>
        <p>
          Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web. En acceptant, vous consentez à l'utilisation de cookies pour l'authentification.
        </p>
        <button onClick={handleAccept} className='button-default'>
          Accepter les cookies
        </button>
      </>
    )}
  </div>
</div>

  );
};

export default CookieBlockedModal;
