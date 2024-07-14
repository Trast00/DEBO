import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Tender from './pages/Tender/Tender';
import Payement from './pages/Payement/Payement';
import NotFound from './pages/NotAccessible/NotFound';
import NotAllowed from './pages/NotAccessible/NotAllowed';
import Home from './pages/Home/home';
import NavBar from './components/Navbar/NavBar';

const App = () => {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tender" element={<Tender />} />
        <Route path="/payement" element={<Payement />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/NotAllowed" element={<NotAllowed />} />
      </Routes>
    </div>
  );
}

export default App;
