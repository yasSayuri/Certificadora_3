import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Componentes/Sidebar';
import './Configuracao.css';

function Configuracao() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: 'User',
    email: 'user@email.com'
  });

  const [modalSairOpen, setModalSairOpen] = useState(false);
  const [modalLimparOpen, setModalLimparOpen] = useState(false);
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const navigate = useNavigate();

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  useEffect(() => {
    const nome = localStorage.getItem('nomeUsuario') || 'User';
    const email = localStorage.getItem('emailUsuario') || 'user@email.com';
    setDadosUsuario({ nome, email });
  }, []);

  const handleSairConta = () => {
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('emailUsuario');
    localStorage.removeItem('idUsuario');
    
    setModalSairOpen(false);
    navigate('/');
  };

  const handleLimparDados = () => {
    localStorage.clear();
    mostrarPopup('Todos os dados locais foram apagados!', 'sucesso');
    
    setModalLimparOpen(false);
    setTimeout(() => {
      navigate('/');
    }, 1500);
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
              <h3>Sobre o Sistema</h3>
              <div className="Info_Group_Config">
                <span className="Label_Config">Versão do Projeto</span>
                <span className="Value_Config">v1.0.0 (Build 2026)</span>
              </div>
              <div className="Info_Group_Config">
                <span className="Label_Config">Ambiente</span>
                <span className="Value_Config">Produção / Frontend React</span>
              </div>
            </div>

            <div className="Config_Acoes">
              <button className="Botao_Sair" onClick={() => setModalSairOpen(true)}>
                Sair da Conta
              </button>
              <button className="Botao_Limpar" onClick={() => setModalLimparOpen(true)}>
                Limpar Dados Locais
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

      {modalLimparOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3 style={{ color: '#d32f2f' }}>Atenção Crítica!</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              Isso irá apagar <strong>todas as preferências salvas no navegador</strong> e desconectar você. Deseja continuar?
            </p>
            <div className="modal_botoes">
              <button type="button" className="btn_cancelar" onClick={() => setModalLimparOpen(false)}>Cancelar</button>
              <button type="button" className="btn_salvar" style={{ background: '#d32f2f' }} onClick={handleLimparDados}>Limpar Tudo</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Configuracao;