import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
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

      const dadosBackend = await resposta.json();

      if (resposta.ok) {
        setEventosBD([...eventosBD, dadosBackend]);
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
        mostrarPopup(dadosBackend.erro || dadosBackend.detalhes || dadosBackend.mensagem || 'Erro ao criar evento.');
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

      <Sidebar paginaAtiva="listaEventos" />

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