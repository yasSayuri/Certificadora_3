import './Calendario.css';

function Calendario() {
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Agenda de Eventos</h1>
      </div>

      <div id="Grade_Calendario">
        {dias.map(dia => (
          <div key={dia} className="Dia_Box">
            <span className="Numero_Dia">{dia}</span>
            {dia === 15 && <div className="Evento_Dot" title="Oficina Python"></div>}
            {dia === 20 && <div className="Evento_Dot" style={{backgroundColor: '#ff8f00'}} title="Palestra"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendario;