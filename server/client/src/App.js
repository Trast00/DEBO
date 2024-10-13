import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Tenders from './pages/Tender/Tenders';
import Payement from './pages/Payement/Payement';
import NotFound from './pages/NotAccessible/NotFound';
import NotAllowed from './pages/NotAccessible/NotAllowed';
import Home from './pages/Home/Home.jsx';
import NavBar from './components/Navbar/NavBar';
import AuthCallBack from './pages/Auth/AuthCallBack';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Contact from './components/Contact/Contact';
import AuthErrorModal from './components/Modals/AuthErrorModal/AuthErrorModal.jsx';
import CookieConsentModal from './components/CookieModal/CookieConsentModal.jsx';


const App = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth0();
  // get server url from .env file

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      //make sure a call is done once
      const uuid = user.sub.split("|")[1]
      fetch(`/api/users/${uuid}`).then(res => {
        return res.json()
      }).then(data => {
        // user is found
        if (data) {
          setUserData(data)
        } else {
          // user is not found, so create it
          fetch(`/api/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {...user, uuid}
            })
          }).then(res => {
            res.json()
          }).then(data => {
            setUserData(data)
          })
        }
      })
    }
  }, [isAuthenticated, isLoading, user])

  const refreshApp = () => {
    window.location.href = '/'
  }
  return (
    <div className="App">
      { showModal && <AuthErrorModal onClose={_ => setShowModal(false)}/> }
      <NavBar userData={userData} showModal={_ => setShowModal(true)}></NavBar>
      <CookieConsentModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenders" element={<Tenders user={userData} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payement />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/NotAllowed" element={<NotAllowed />} />
        <Route path="/auth-callback" element={<AuthCallBack showAuthModal={_ => setShowModal(true)} refreshApp={_ => refreshApp()} />} />
      </Routes>
    </div>
  );
}

export default App;