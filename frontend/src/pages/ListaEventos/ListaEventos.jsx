import React, { useState, useEffect } from 'react';
import Sidebar from '../Componentes/Sidebar';
import './ListaEventos.css';

function ListaEventos() {
  const eventosEstaticos = [
    { _id: '1', nome: "Oficina de Python", data: "15/05/2026", horarioInicio: "14:00", horarioTermino: "16:00", local: "Laboratório 1", vagas: 10, tipo: "Oficina", inscritos: [] },
    { _id: '2', nome: "Palestra: Mulheres na Tecnologia", data: "20/05/2026", horarioInicio: "19:00", horarioTermino: "21:00", local: "Auditório Principal", vagas: 50, tipo: "Palestra", inscritos: [] },
    { _id: '3', nome: "Introdução ao Arduino", data: "22/05/2026", horarioInicio: "08:00", horarioTermino: "12:00", local: "Laboratório Maker", vagas: 5, tipo: "Oficina", inscritos: [] },
    { _id: '4', nome: "Workshop de React", data: "05/06/2026", horarioInicio: "09:00", horarioTermino: "12:00", local: "Laboratório 3", vagas: 25, tipo: "Oficina", inscritos: [] },
    { _id: '5', nome: "Palestra: Inteligência Artificial", data: "30/05/2026", horarioInicio: "19:30", horarioTermino: "21:30", local: "Auditório Principal", vagas: 100, tipo: "Palestra", inscritos: [] },
    { _id: '6', nome: "UX/UI Design para Iniciantes", data: "25/05/2026", horarioInicio: "14:00", horarioTermino: "17:00", local: "Sala 204", vagas: 20, tipo: "Oficina", inscritos: [] }
  ];

  const [eventosBD, setEventosBD] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  
  // Novos estados para o modal de deletar
  const [modalDeletarEventoOpen, setModalDeletarEventoOpen] = useState(false);
  const [eventoParaDeletar, setEventoParaDeletar] = useState(null);

  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const [eventoEditando, setEventoEditando] = useState(null);
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioTermino, setHorarioTermino] = useState('');
  const [local, setLocal] = useState('');
  const [vagas, setVagas] = useState('');
  const [tipo, setTipo] = useState('Oficina');

  const idUsuario = localStorage.getItem('idUsuario');

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

  const abrirModalCriar = () => {
    setEventoEditando(null);
    setNome(''); setData(''); setHorarioInicio(''); setHorarioTermino(''); setLocal(''); setVagas(''); setTipo('Oficina');
    setModalOpen(true);
  };

  const abrirModalEditar = (evento) => {
    setEventoEditando(evento._id);
    setNome(evento.nome); setData(evento.data); setHorarioInicio(evento.horarioInicio); setHorarioTermino(evento.horarioTermino); setLocal(evento.local); setVagas(evento.vagas); setTipo(evento.tipo);
    setModalOpen(true);
  };

  const abrirModalDeletar = (id) => {
    setEventoParaDeletar(id);
    setModalDeletarEventoOpen(true);
  };

  const salvarEvento = async (e) => {
    e.preventDefault();

    if (!nome || !data || !horarioInicio || !horarioTermino || !local || !vagas) {
      mostrarPopup('Preencha todos os campos!');
      return;
    }

    try {
      if (eventoEditando) {
        const resposta = await fetch(`http://localhost:3000/eventos/${eventoEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, data, horarioInicio, horarioTermino, local, vagas: Number(vagas), tipo })
        });
        const eventoAtualizado = await resposta.json();
        if (resposta.ok) {
          setEventosBD(eventosBD.map(ev => ev._id === eventoEditando ? eventoAtualizado : ev));
          mostrarPopup('Evento atualizado!', 'sucesso');
        } else {
          mostrarPopup('Erro ao atualizar evento.');
        }
      } else {
        const resposta = await fetch('http://localhost:3000/eventos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, data, horarioInicio, horarioTermino, local, vagas: Number(vagas), tipo })
        });
        const novoEvento = await resposta.json();
        if (resposta.ok) {
          setEventosBD([...eventosBD, novoEvento]);
          mostrarPopup('Evento criado com sucesso!', 'sucesso');
        } else {
          mostrarPopup('Erro ao criar evento.');
        }
      }
      setModalOpen(false);
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
    }
  };

  const deletarEvento = async () => {
    if (!eventoParaDeletar) return;
    
    try {
      const resposta = await fetch(`http://localhost:3000/eventos/${eventoParaDeletar}`, { method: 'DELETE' });
      if (resposta.ok) {
        setEventosBD(eventosBD.filter(ev => ev._id !== eventoParaDeletar));
        mostrarPopup('Evento excluído!', 'sucesso');
        setModalDeletarEventoOpen(false);
      } else {
        mostrarPopup('Erro ao excluir evento.');
        setModalDeletarEventoOpen(false);
      }
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
      setModalDeletarEventoOpen(false);
    }
  };

  const inscreverEvento = async (id) => {
    if (!idUsuario) {
      mostrarPopup('Você precisa estar logado para se inscrever.');
      return;
    }
    try {
      const resposta = await fetch(`http://localhost:3000/eventos/${id}/inscrever`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId: idUsuario })
      });
      if (resposta.ok) {
        const data = await resposta.json();
        setEventosBD(eventosBD.map(ev => ev._id === id ? data.evento : ev));
        const taInscrito = data.evento.inscritos.includes(idUsuario);
        mostrarPopup(taInscrito ? 'Inscrição confirmada!' : 'Inscrição cancelada!', 'sucesso');
      } else {
        mostrarPopup('Erro ao processar inscrição.');
      }
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
    }
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
            <button className="Botao_Criar" onClick={abrirModalCriar}>Criar Novo Evento</button>
          </div>
        </header>

        <div className="Container_Cartoes">
          {eventosFiltrados.map(evento => {
            const isInscrito = evento.inscritos && evento.inscritos.includes(idUsuario);
            return (
              <div key={evento._id} className="Card_Evento">
                <div className="Acoes_Card">
                  <button className="Btn_Icone edit" onClick={() => abrirModalEditar(evento)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                  </button>
                  <button className="Btn_Icone del" onClick={() => abrirModalDeletar(evento._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                  </button>
                </div>
                
                <div className="Header_Card_Info">
                  <div className="Badge_Tipo">{evento.tipo}</div>
                  {isInscrito && <div className="Badge_Inscrito">Você está inscrita neste</div>}
                </div>
                
                <h3>{evento.nome}</h3>
                <p><strong>Data:</strong> {evento.data}</p>
                <p><strong>Horário:</strong> {evento.horarioInicio} - {evento.horarioTermino}</p>
                <p><strong>Local:</strong> {evento.local}</p>
                <p><strong>Vagas restantes:</strong> {evento.vagas}</p>
                
                <button 
                  className={`Botao_Increver ${isInscrito ? 'cancelar' : ''}`} 
                  onClick={() => inscreverEvento(evento._id)}
                >
                  {isInscrito ? 'Cancelar Inscrição' : 'Inscrever-se'}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal de Criar/Editar Evento */}
      {modalOpen && (
        <div className="modal_overlay">
          <div className="modal_box modal_evento">
            <h3>{eventoEditando ? 'Editar Evento' : 'Criar Novo Evento'}</h3>
            <div className="toggle_container">
              <button type="button" className={`toggle_btn ${tipo === 'Oficina' ? 'active' : ''}`} onClick={() => setTipo('Oficina')}>Oficina</button>
              <button type="button" className={`toggle_btn ${tipo === 'Palestra' ? 'active' : ''}`} onClick={() => setTipo('Palestra')}>Palestra</button>
            </div>
            <form onSubmit={salvarEvento} className="modal_form form_evento">
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

      {/* Modal de Confirmar Exclusão de Evento */}
      {modalDeletarEventoOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3 style={{ color: '#d32f2f' }}>Excluir Evento</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              Tem certeza que deseja excluir este evento? Esta ação <strong>não pode ser desfeita</strong>.
            </p>
            <div className="modal_botoes">
              <button type="button" className="btn_cancelar" onClick={() => setModalDeletarEventoOpen(false)}>Cancelar</button>
              <button type="button" className="btn_salvar" style={{ background: '#d32f2f' }} onClick={deletarEvento}>Sim, Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaEventos;