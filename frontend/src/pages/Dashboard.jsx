import './Dashboard.css';
import GraficoEventos from './GraficoEventos';


function Dashboard() {
  const acoes = [
    { id: 1, titulo: "Meus Agendamentos", desc: "Veja suas palestras marcadas" },
    { id: 2, titulo: "Nova Inscrição", desc: "Inscreva-se em novos eventos" },
    { id: 3, titulo: "Certificados", desc: "Baixe seus comprovantes" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Painel de Controle</h1>
      </div>

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
  );
}

export default Dashboard;