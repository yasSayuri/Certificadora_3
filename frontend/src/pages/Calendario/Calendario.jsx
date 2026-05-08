import React, { useState, useEffect } from 'react';
import Sidebar from '../Componentes/Sidebar';
import './Calendario.css';

function Calendario() {
  const [dataExibicao, setDataExibicao] = useState(new Date());
  const [eventosBD, setEventosBD] = useState([]);
  const [busca, setBusca] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  
  const [mostrarOutros, setMostrarOutros] = useState(true);
  const [mostrarMeus, setMostrarMeus] = useState(true);

  const idUsuario = localStorage.getItem('idUsuario');

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const hoje = new Date();
  const diaDeHoje = hoje.getDate();
  const mesDeHoje = hoje.getMonth();
  const anoDeHoje = hoje.getFullYear();

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/eventos');
        if (resposta.ok) {
          const dados = await resposta.json();
          setEventosBD(dados);
        }
      } catch (error) {
        console.error(error);
      }
    };
    buscarEventos();
  }, []);

  const mudarMes = (direcao) => {
    const novaData = new Date(dataExibicao);
    novaData.setMonth(dataExibicao.getMonth() + direcao);
    setDataExibicao(novaData);
    setDiaSelecionado(null);
  };

  const ano = dataExibicao.getFullYear();
  const mes = dataExibicao.getMonth();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const totalDiasMes = new Date(ano, mes + 1, 0).getDate();

  const diasCalendario = [];
  for (let i = 0; i < primeiroDiaSemana; i++) {
    diasCalendario.push(null);
  }
  for (let d = 1; d <= totalDiasMes; d++) {
    diasCalendario.push(d);
  }

  const getEventosDoDia = (dia) => {
    if (!dia) return [];
    const dataString = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    
    return eventosBD.filter(evento => {
      const dataFormatada = evento.data.includes('/') 
        ? evento.data.split('/').reverse().join('-') 
        : evento.data;
      
      const isInscrito = evento.inscritos && evento.inscritos.includes(idUsuario);
      
      const coincideFiltro = (mostrarMeus && isInscrito) || (mostrarOutros && !isInscrito);
      const coincideData = dataFormatada === dataString;
      const coincideBusca = evento.nome.toLowerCase().includes(busca.toLowerCase());
      
      return coincideData && coincideBusca && coincideFiltro;
    });
  };

  return (
    <div className="dashboard_layout">
      <Sidebar paginaAtiva="calendario" />

      <main className="dashboard_main">
        <header className="header_calendario">
          <div className="titulo_secao">
            <h1 className="greeting">Agenda de Eventos</h1>
            <div className="navegacao_mes">
              <button onClick={() => mudarMes(-1)} className="btn_seta">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
              </button>
              <h2 className="mes_ano">{meses[mes]} {ano}</h2>
              <button onClick={() => mudarMes(1)} className="btn_seta">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M384-240 328-296l184-184-184-184 56-56 240 240-240 240Z"/></svg>
              </button>
            </div>
          </div>
          
          <div className="filtro_container">
            <div className="search_wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#888"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
              <input 
                type="text" 
                placeholder="Filtrar evento por nome..." 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)} 
              />
            </div>
            <div className="filtros_checkboxes">
              <label className="checkbox_label">
                <input 
                  type="checkbox" 
                  checked={mostrarOutros} 
                  onChange={(e) => setMostrarOutros(e.target.checked)} 
                />
                <span className="dot_legend" style={{ background: '#6a1b9a' }}></span>
                Outros Eventos
              </label>
              <label className="checkbox_label">
                <input 
                  type="checkbox" 
                  checked={mostrarMeus} 
                  onChange={(e) => setMostrarMeus(e.target.checked)} 
                />
                <span className="dot_legend" style={{ background: '#db2997' }}></span>
                Meus Eventos
              </label>
            </div>
          </div>
        </header>

        <div className="calendario_flex_wrapper">
          <div className="Grade_Calendario_Real">
            <div className="Dias_Semana">
              <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
            </div>
            <div className="Grid_Dias">
              {diasCalendario.map((dia, index) => {
                const eventosDia = getEventosDoDia(dia);
                const isHoje = dia === diaDeHoje && mes === mesDeHoje && ano === anoDeHoje;
                
                return (
                  <div 
                    key={index} 
                    className={`Dia_Box_Real ${!dia ? 'vazio' : ''} ${diaSelecionado === dia ? 'selecionado' : ''} ${isHoje ? 'hoje' : ''}`}
                    onClick={() => dia && setDiaSelecionado(dia)}
                  >
                    {dia && <span className="Numero_Dia">{dia}</span>}
                    <div className="Eventos_Dots_Wrapper">
                      {eventosDia.map(ev => {
                        const isInscrito = ev.inscritos && ev.inscritos.includes(idUsuario);
                        const corDot = isInscrito ? '#db2997' : (ev.tipo === 'Palestra' ? '#ff8f00' : '#6a1b9a');
                        
                        return (
                          <div 
                            key={ev._id} 
                            className="Evento_Dot_Fofo" 
                            data-tooltip={ev.nome}
                            style={{ background: corDot }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="Painel_Detalhes_Fixo">
            {diaSelecionado ? (
              <>
                <h3 className="detalhes_titulo">Eventos do dia {diaSelecionado}</h3>
                <div className="lista_detalhes_scroll">
                  {getEventosDoDia(diaSelecionado).length > 0 ? (
                    getEventosDoDia(diaSelecionado).map(ev => {
                      const isInscrito = ev.inscritos && ev.inscritos.includes(idUsuario);
                      const corTag = isInscrito ? '#db2997' : (ev.tipo === 'Palestra' ? '#ff8f00' : '#6a1b9a');

                      return (
                        <div key={ev._id} className="card_detalhe_item" style={{ borderLeft: isInscrito ? '4px solid #db2997' : '1px solid #eee' }}>
                          <span className="tipo_tag" style={{ background: corTag }}>
                            {isInscrito ? 'Inscrita' : ev.tipo}
                          </span>
                          <h4>{ev.nome}</h4>
                          <p><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg> {ev.horarioInicio} - {ev.horarioTermino}</p>
                          <p><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-75.5-188.5T480-820q-104 0-179.5 79.5T225-552q0 71 59 162.5T480-186Z"/></svg> {ev.local}</p>
                        </div>
                      )
                    })
                  ) : (
                    <p className="sem_nada">Nenhum evento neste dia.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="vazio_state">
                <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#ddd"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Z"/></svg>
                <p>Selecione um dia para ver os detalhes</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Calendario;