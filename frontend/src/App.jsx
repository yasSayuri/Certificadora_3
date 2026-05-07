import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';        
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';    

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;