import React, { useState, useEffect } from 'react';
import { useNavigate as useKmNavigate } from 'react-router-dom'; 
import Sidebar from '../Componentes/Sidebar';
import './Configuracao.css';

function Configuracao() {
  const [dadosUsuario, setDadosUsuario] = useState({
    id: '',
    nome: 'User',
    email: 'user@email.com'
  });

  const [modalSairOpen, setModalSairOpen] = useState(false);
  const [modalDeletarOpen, setModalDeletarOpen] = useState(false);
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const navigate = useKmNavigate();

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  useEffect(() => {
    const id = localStorage.getItem('idUsuario');
    const nome = localStorage.getItem('nomeUsuario') || 'User';
    const email = localStorage.getItem('emailUsuario') || 'user@email.com';
    
    if (!id) {
      mostrarPopup('Usuário não identificado. Redirecionando...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setDadosUsuario({ id, nome, email });
    fetch(`http://localhost:3000/usuarios/${id}`)
      .then((resposta) => {
        if (resposta.ok) return resposta.json();
        throw new Error('Erro ao buscar dados do servidor');
      })
      .then((dados) => {
        if (dados && dados.nome) {
          setDadosUsuario({ id, nome: dados.nome, email: dados.email });
        }
      })
      .catch((erro) => console.error('Erro ao sincronizar dados:', erro));
  }, [navigate]);

  const handleSairConta = () => {
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('emailUsuario');
    localStorage.removeItem('idUsuario');
    
    setModalSairOpen(false);
    navigate('/');
  };

  const confirmarDelecaoConta = async () => {
    try {
      const resposta = await fetch(`http://localhost:3000/usuarios/${dadosUsuario.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (resposta.ok) {
        setModalDeletarOpen(false);
        mostrarPopup('Sua conta foi excluída permanentemente.', 'sucesso');
        
        localStorage.clear();

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        mostrarPopup('Erro ao tentar excluir a conta do servidor.');
      }
    } catch (erro) {
      console.error('Erro na requisição DELETE:', erro);
      mostrarPopup('Erro interno do servidor.');
    }
  };

  return (
    <div className="config_layout">
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      <Sidebar paginaAtiva="configuracao" />

      <main className="config_main">
        <header className="config_header">
          <h1 id="Titulo">Configurações do Sistema</h1>
        </header>

        <div className="config_content">
          <div id="Caixa_Config">
            <div className="Config_Secao">
              <h3>Usuário Conectado</h3>
              <div className="Info_Group_Config">
                <span className="Label_Config">Nome</span>
                <span className="Value_Config">{dadosUsuario.nome}</span>
              </div>
              <div className="Info_Group_Config">
                <span className="Label_Config">E-mail de Acesso</span>
                <span className="Value_Config">{dadosUsuario.email}</span>
              </div>
            </div>

            <div className="Config_Secao">
              <h3>Sobre o Aplicativo</h3>
              <div className="Info_Group_Config">
                <span className="Label_Config">Versão do Projeto</span>
                <span className="Value_Config">v1.0.0 (Build 2026)</span>
              </div>
            </div>

            <div className="Config_Acoes">
              <button 
                type="button" 
                className="Botao_Sair" 
                onClick={() => setModalSairOpen(true)}
              >
                Sair da Conta
              </button>
              
              <button 
                type="button" 
                className="Botao_Limpar" 
                onClick={() => setModalDeletarOpen(true)}
              >
                Excluir Conta Permanentemente
              </button>
            </div>

          </div>
        </div>
      </main>

      {modalSairOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3>Encerrar Sessão</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              Tem certeza que deseja sair da sua conta atual?
            </p>
            <div className="modal_botoes">
              <button type="button" className="btn_cancelar" onClick={() => setModalSairOpen(false)}>Cancelar</button>
              <button type="button" className="btn_salvar" onClick={handleSairConta}>Sair</button>
            </div>
          </div>
        </div>
      )}

      {modalDeletarOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3 style={{ color: '#d32f2f' }}>Atenção!</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              Tem certeza que deseja deletar sua conta? Esta ação <strong>não pode ser desfeita</strong> e apagará permanentemente seus dados.
            </p>
            <div className="modal_botoes">
              <button type="button" className="btn_cancelar" onClick={() => setModalDeletarOpen(false)}>Cancelar</button>
              <button type="button" className="btn_salvar" style={{ background: '#d32f2f' }} onClick={confirmarDelecaoConta}>Sim, Deletar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Configuracao;