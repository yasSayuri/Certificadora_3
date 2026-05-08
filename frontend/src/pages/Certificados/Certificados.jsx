import React, { useState } from 'react';
import Sidebar from '../Componentes/Sidebar';
import './Certificados.css';

function Certificados() {
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const concluidos = [
    { id: 101, evento: "Lógica de Programação", data: "10/03/2026" },
    { id: 102, evento: "Workshop HTML/CSS", data: "25/03/2026" }
  ];

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  return (
    <div className="dashboard_layout">
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      <Sidebar paginaAtiva="certificados" />

      <main className="dashboard_main">
        <header className="dashboard_header">
          <h1 className="greeting">Meus Certificados</h1>
          <p id="Titulo">Baixe seus comprovantes de participação</p>
        </header>

        <div className="certificados_content">
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
                    <td>
                      <button 
                        className="Botao_Download" 
                        onClick={() => mostrarPopup('Ainda não implementado', 'erro')}
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Certificados;