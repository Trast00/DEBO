import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Tenders from './pages/Tender/Tenders';
import Payement from './pages/Payement/Payement';
import NotFound from './pages/NotAccessible/NotFound';
import NotAllowed from './pages/NotAccessible/NotAllowed';
import Home from './pages/Home/home';
import NavBar from './components/Navbar/NavBar';
import AuthCallBack from './pages/Auth/AuthCallBack';
import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const App = () => {
  const [userData, setUserData] = useState(null);
  const { isAuthenticated, isLoading, user } = useAuth0();
  // how to get user uuid in auth0

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      //make sure a call is done once
      console.log("user:", user)
      const uuid = user.sub.split("|")[1]
      fetch(`http://localhost:3000/users/${uuid}`).then(res => {
        console.log("res: ",res)
        res.json()
      }).then(data => {
        // user is found
        if (data) {
          setUserData(data)
        } else {
          // user is not found, so create it
          fetch(`http://localhost:3000/users`, {
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
  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/payement" element={<Payement />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/NotAllowed" element={<NotAllowed />} />
          <Route path="/auth-callback" element={<AuthCallBack />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
