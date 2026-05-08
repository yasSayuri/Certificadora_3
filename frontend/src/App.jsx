import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';        
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';    
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ListaEventos from './pages/ListaEventos';
import GraficoEventos from './pages/GraficoEventos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/listaEventos" element={<ListaEventos />} />
      </Routes>
    </Router>
  );
}

export default App;