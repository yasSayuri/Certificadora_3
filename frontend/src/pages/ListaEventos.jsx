import './ListaEventos.css';

function ListaEventos() {
  const eventos = [
    { id: 1, nome: "Oficina de Python", data: "15/05/2026", vagas: 10, tipo: "Oficina" },
    { id: 2, nome: "Palestra: Mulheres na Tecnologia", data: "20/05/2026", vagas: 50, tipo: "Palestra" },
    { id: 3, nome: "Introdução ao Arduino", data: "22/05/2026", vagas: 5, tipo: "Oficina" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Eventos Disponíveis</h1>
      </div>

      <div className="Container_Cartoes">
        {eventos.map(evento => (
          <div key={evento.id} className="Card_Evento">
            <div className="Badge_Tipo">{evento.tipo}</div>
            <h3>{evento.nome}</h3>
            <p><strong>Data:</strong> {evento.data}</p>
            <p><strong>Vagas restantes:</strong> {evento.vagas}</p>
            <button className="Botao_Increver">Inscrever-se</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaEventos;