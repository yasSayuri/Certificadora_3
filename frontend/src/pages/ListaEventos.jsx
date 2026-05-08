import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListaEventos.css';

function ListaEventos() {
  const eventosEstaticos = [
    { _id: '1', nome: "Oficina de Python", data: "15/05/2026", horarioInicio: "14:00", horarioTermino: "16:00", local: "Laboratório 1", vagas: 10, tipo: "Oficina" },
    { _id: '2', nome: "Palestra: Mulheres na Tecnologia", data: "20/05/2026", horarioInicio: "19:00", horarioTermino: "21:00", local: "Auditório Principal", vagas: 50, tipo: "Palestra" },
    { _id: '3', nome: "Introdução ao Arduino", data: "22/05/2026", horarioInicio: "08:00", horarioTermino: "12:00", local: "Laboratório Maker", vagas: 5, tipo: "Oficina" },
    { _id: '4', nome: "Workshop de React", data: "05/06/2026", horarioInicio: "09:00", horarioTermino: "12:00", local: "Laboratório 3", vagas: 25, tipo: "Oficina" },
    { _id: '5', nome: "Palestra: Inteligência Artificial", data: "30/05/2026", horarioInicio: "19:30", horarioTermino: "21:30", local: "Auditório Principal", vagas: 100, tipo: "Palestra" },
    { _id: '6', nome: "UX/UI Design para Iniciantes", data: "25/05/2026", horarioInicio: "14:00", horarioTermino: "17:00", local: "Sala 204", vagas: 20, tipo: "Oficina" }
  ];

  const [eventosBD, setEventosBD] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioTermino, setHorarioTermino] = useState('');
  const [local, setLocal] = useState('');
  const [vagas, setVagas] = useState('');
  const [tipo, setTipo] = useState('Oficina');

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/eventos');
        if (resposta.ok) {
          const dados = await resposta.json();
          setEventosBD(dados);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos do banco.");
      }
    };
    buscarEventos();
  }, []);

  const criarEvento = async (e) => {
    e.preventDefault();

    if (!nome || !data || !horarioInicio || !horarioTermino || !local || !vagas) {
      mostrarPopup('Preencha todos os campos!');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, data, horarioInicio, horarioTermino, local, vagas: Number(vagas), tipo })
      });

      if (resposta.ok) {
        const novoEvento = await resposta.json();
        setEventosBD([...eventosBD, novoEvento]);
        mostrarPopup('Evento criado com sucesso!', 'sucesso');
        setModalOpen(false);
        setNome('');
        setData('');
        setHorarioInicio('');
        setHorarioTermino('');
        setLocal('');
        setVagas('');
        setTipo('Oficina');
      } else {
        mostrarPopup('Erro ao criar evento.');
      }
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
    }
  };

  const realizarInscricao = () => {
    mostrarPopup('Inscrição realizada com sucesso!', 'sucesso');
  };

  const todosEventos = [...eventosEstaticos, ...eventosBD];
  const eventosFiltrados = todosEventos.filter(evento => 
    evento.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="dashboard_layout">
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      <aside className="sidebar">
        <h2 className="sidebar_logo">NoteBook</h2>
        
        <nav className="sidebar_nav">
          <Link to="/dashboard" className="nav_item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-80Zm240-240Zm-240 0Z"/></svg>
            Dashboard
          </Link>
          
          <Link to="/perfil" className="nav_item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            Meu Perfil
          </Link>

          <Link to="/ListaEventos" className="nav_item active">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-240v-80h640v80H160Zm0-200v-80h640v80H160Zm0-200v-80h640v80H160Z"/></svg>
            Lista de Eventos
          </Link>

          <Link to="/GraficoEventos" className="nav_item">
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

      <main className="dashboard_main">
        <header className="header_eventos">
          <div>
            <h1 className="greeting">Lista de Eventos</h1>
            <p id="Titulo">Explore e participe das nossas atividades</p>
          </div>
          <div className="header_acoes">
            <input 
              type="text" 
              placeholder="Pesquisar evento..." 
              value={busca} 
              onChange={(e) => setBusca(e.target.value)} 
              className="Input_Pesquisa"
            />
            <button className="Botao_Criar" onClick={() => setModalOpen(true)}>Criar Novo Evento</button>
          </div>
        </header>

        <div className="Container_Cartoes">
          {eventosFiltrados.map(evento => (
            <div key={evento._id} className="Card_Evento">
              <div className="Badge_Tipo">{evento.tipo}</div>
              <h3>{evento.nome}</h3>
              <p><strong>Data:</strong> {evento.data}</p>
              <p><strong>Horário:</strong> {evento.horarioInicio} - {evento.horarioTermino}</p>
              <p><strong>Local:</strong> {evento.local}</p>
              <p><strong>Vagas restantes:</strong> {evento.vagas}</p>
              <button className="Botao_Increver" onClick={realizarInscricao}>Inscrever-se</button>
            </div>
          ))}
        </div>
      </main>

      {modalOpen && (
        <div className="modal_overlay">
          <div className="modal_box modal_evento">
            <h3>Criar Novo Evento</h3>
            <div className="toggle_container">
              <button type="button" className={`toggle_btn ${tipo === 'Oficina' ? 'active' : ''}`} onClick={() => setTipo('Oficina')}>Oficina</button>
              <button type="button" className={`toggle_btn ${tipo === 'Palestra' ? 'active' : ''}`} onClick={() => setTipo('Palestra')}>Palestra</button>
            </div>
            <form onSubmit={criarEvento} className="modal_form form_evento">
              <input type="text" placeholder="Nome do evento" value={nome} onChange={(e) => setNome(e.target.value)} required />
              <div className="form_linha">
                <input type="date" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} required />
                <input type="number" placeholder="Vagas" value={vagas} onChange={(e) => setVagas(e.target.value)} required />
              </div>
              <div className="form_linha">
                <input type="time" placeholder="Horário Início" value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} required />
                <input type="time" placeholder="Horário Término" value={horarioTermino} onChange={(e) => setHorarioTermino(e.target.value)} required />
              </div>
              <input type="text" placeholder="Local" value={local} onChange={(e) => setLocal(e.target.value)} required />
              
              <div className="modal_botoes">
                <button type="button" className="btn_cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn_salvar">Salvar Evento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaEventos;