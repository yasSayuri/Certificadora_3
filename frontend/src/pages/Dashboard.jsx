import './Dashboard.css';
import GraficoEventos from './GraficoEventos';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [primeiroNome, setPrimeiroNome] = useState('User');
  const [saudacao, setSaudacao] = useState('Bem-vindo(a)');
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });
  
  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

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
      
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      {/* COMPONENTE CHAMADO AQUI */}
      <Sidebar paginaAtiva="dashboard" />

      <main className="dashboard_main">
        <header className="dashboard_header">
          <h1 className="greeting">{saudacao} de volta, {primeiroNome}!</h1>
          <p id="Titulo">Painel de Controle</p>
        </header>

        <div className="conteudo_amigo">
          <GraficoEventos />
        
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