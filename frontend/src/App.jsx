import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home/Home';        
import Cadastro from './pages/Cadastro/Cadastro';
import Perfil from './pages/Perfil/Perfil';    
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ListaEventos from './pages/ListaEventos/ListaEventos';
import Calendario from './pages/Calendario/Calendario';
import Certificados from './pages/Certificados/Certificados';


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
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/certificados" element={<Certificados />} />
      </Routes>
    </Router>
  );
}

export default App;