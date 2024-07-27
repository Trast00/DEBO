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
import { useEffect, useState } from 'react';


const App = () => {
  const [userData, setUserData] = useState(null);
  //console.log("user data: ",userData)
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      //make sure a call is done once
      const uuid = user.sub.split("|")[1]
      fetch(`http://localhost:3000/users/${uuid}`).then(res => {
        return res.json()
      }).then(data => {
        // user is found
        if (data) {
          console.log("user getted: ", data)
          setUserData(data)
        } else {
          // user is not found, so create it
          console.log("user created: ", data)
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
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenders" element={<Tenders user={userData} />} />
        <Route path="/payement" element={<Payement />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/NotAllowed" element={<NotAllowed />} />
        <Route path="/auth-callback" element={<AuthCallBack />} />
      </Routes>
    </div>
  );
}

export default App;
