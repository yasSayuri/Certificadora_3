import './Dashboard.css';
import GraficoEventos from '../Componentes/GraficoEventos';
import Sidebar from '../Componentes/Sidebar';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [primeiroNome, setPrimeiroNome] = useState('User');
  const [saudacao, setSaudacao] = useState('Bem-vindo(a)');

  useEffect(() => {
    const buscarUsuario = () => {
      try {
        const nomeCompleto = localStorage.getItem('nomeUsuario') || 'User';
        const primeiro = nomeCompleto.split(' ')[0];
        setPrimeiroNome(primeiro);

        const nomeLower = primeiro.toLowerCase();
        const excecoesFemininas = ['yasmin', 'beatriz', 'alice', 'aline', 'raquel', 'ester', 'simone', 'suelen', 'karen', 'ellen', 'laís', 'íris', 'sayuri'];
        const excecoesMasculinas = ['luca', 'jonas', 'matias', 'messias', 'isaías', 'lucas', 'nicolas'];

        let artigo = 'Bem-vindo';

        if (excecoesMasculinas.includes(nomeLower)) {
          artigo = 'Bem-vindo';
        } else if (nomeLower.endsWith('a') || excecoesFemininas.includes(nomeLower) || nomeLower.endsWith('y') || nomeLower.endsWith('i') || nomeLower.endsWith('e')) {
          artigo = 'Bem-vinda';
        }

        setSaudacao(artigo);
      } catch (erro) {
        setPrimeiroNome('User');
        setSaudacao('Bem-vindo(a)');
      }
    };

    buscarUsuario();
  }, []);

  return (
    <div className="dashboard_layout">
      <Sidebar paginaAtiva="dashboard" />

      <main className="dashboard_main dashboard_graficos_main">
        <header className="dashboard_header dashboard_graficos_header">
          <h1 className="greeting">{saudacao} de volta, {primeiroNome}!</h1>
          <p id="Titulo">Painel de acompanhamento dos eventos</p>
        </header>

        <div className="dashboard_graficos_content">
          <GraficoEventos />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;