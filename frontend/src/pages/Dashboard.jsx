import './Dashboard.css';
import GraficoEventos from './GraficoEventos';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [primeiroNome, setPrimeiroNome] = useState('User');

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const dados = { nome: "User" }; 
        const nomeFormatado = dados.nome.split(' ')[0]; 
        setPrimeiroNome(nomeFormatado);
      } catch (erro) {
        console.error(erro);
      }
    };
    buscarUsuario();
  }, []);

  const acoes = [
    { id: 1, titulo: "Meus Agendamentos", desc: "Veja suas palestras marcadas" },
    { id: 2, titulo: "Nova Inscrição", desc: "Inscreva-se em novos eventos" },
    { id: 3, titulo: "Certificados", desc: "Baixe seus comprovantes" }
  ];

  return (
    <div className="dashboard_layout">

      <aside className="sidebar">
        <h2 className="sidebar_logo">NoteBook</h2>
        
        <nav className="sidebar_nav">
          <Link to="/dashboard" className="nav_item active">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-80Zm240-240Zm-240 0Z"/></svg>
            Dashboard
          </Link>
          
          <Link to="/perfil" className="nav_item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            Meu Perfil
          </Link>
        </nav>

        <Link to="/" className="nav_logout">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
          Sair
        </Link>
      </aside>

      <main className="dashboard_main">
        
        <header className="dashboard_header">
          <h1 className="greeting">Bem-vinda de volta, {primeiroNome}!</h1>
          <p id="Titulo">Painel de Controle</p>
        </header>

        <div className="dashboard_content">
          <div className="grafico_wrapper">
            <GraficoEventos />
          </div>
        
          <div className="Grid_Dashboard">
            {acoes.map(acao => (
              <div key={acao.id} className="Card_Dash">
                <h3>{acao.titulo}</h3>
                <p>{acao.desc}</p>
                <button className="Botao_Dash">Acessar</button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;