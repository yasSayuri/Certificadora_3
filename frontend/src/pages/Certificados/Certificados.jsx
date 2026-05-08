import './Certificados.css';

function Certificados() {
  const concluidos = [
    { id: 101, evento: "Lógica de Programação", data: "10/03/2026" },
    { id: 102, evento: "Workshop HTML/CSS", data: "25/03/2026" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Meus Certificados</h1>
      </div>

      <div id="Caixa_Certificados">
        <table className="Tabela_Certificados">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {concluidos.map(c => (
              <tr key={c.id}>
                <td>{c.evento}</td>
                <td>{c.data}</td>
                <td><button className="Botao_Download">Download PDF</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Certificados;