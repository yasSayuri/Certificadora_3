import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ paginaAtiva }) {
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  return (
    <>
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}
      
      <aside className="sidebar">
        <h2 className="sidebar_logo">NoteBook</h2>
        
        <nav className="sidebar_nav">
          <Link to="/dashboard" className={`nav_item ${paginaAtiva === 'dashboard' ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-80Zm240-240Zm-240 0Z"/></svg>
            Dashboard
          </Link>
          
          <Link to="/perfil" className={`nav_item ${paginaAtiva === 'perfil' ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            Meu Perfil
          </Link>

          <Link to="/ListaEventos" className={`nav_item ${paginaAtiva === 'listaEventos' ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-240v-80h640v80H160Zm0-200v-80h640v80H160Zm0-200v-80h640v80H160Z"/></svg>
            Lista de Eventos
          </Link>

          <Link to="/GraficoEventos" className={`nav_item ${paginaAtiva === 'graficoEventos' ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-280h80v-280h-80v280Zm200 0h80v-400h-80v400Zm200 0h80v-160h-80v160ZM160-160q-33 0-56.5-23.5T80-240v-560h80v560h680v80H160Z"/></svg>
            Gráfico de Eventos
          </Link>

          <div className="nav_item" style={{ cursor: 'pointer' }} onClick={() => mostrarPopup('Ainda não implementado', 'erro')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-340q-58 0-99-42t-41-99q0-58 41-99t99-42q58 0 99 42t41 99q0 58-41 99t-99 42Zm-20 256L428-142q-20-5-38-14t-33-21l-55 23-45-78 47-36q-2-10-3-20.5t-1-21.5q0-11 1-21.5t3-20.5l-47-36 45-78 55 23q15-12 33-21t38-14l32-58h90l32 58q20 5 38 14t33 21l55-23 45 78-47 36q2 10 3 20.5t1 21.5q0 11-1 21.5t-3 20.5l47 36-45 78-55-23q-15 12-33 21t-38 14l-32 58h-90Z"/></svg>
            Configurações
          </div>
        </nav>

        <Link to="/" className="nav_logout" onClick={() => localStorage.clear()}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
          Sair
        </Link>
      </aside>
    </>
  );
}

export default Sidebar;