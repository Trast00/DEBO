import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Tender from './pages/Tender/Tender';
import Payement from './pages/Payement/Payement';
import NotFound from './pages/NotAccessible/NotFound';
import NotAllowed from './pages/NotAccessible/NotAllowed';

const App = () => {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tender" element={<Tender />} />
          <Route path="/payement" element={<Payement />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/NotAllowed" element={<NotAllowed />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
