import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Componentes/Sidebar';
import './Perfil.css';

function Perfil() {
  const [dadosUsuario, setDadosUsuario] = useState({
    id: '',
    nome: 'User',
    email: 'user@email.com'
  });

  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalSenhaOpen, setModalSenhaOpen] = useState(false);
  const [modalDeletarOpen, setModalDeletarOpen] = useState(false);

  const [editNome, setEditNome] = useState('');
  const [editEmail, setEditEmail] = useState('');
  
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

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
    const id = localStorage.getItem('idUsuario') || '';
    
    setDadosUsuario({ id, nome, email });
  }, []);

  const inicial = dadosUsuario.nome.charAt(0).toUpperCase();

  const abrirModalEditar = () => {
    setEditNome(dadosUsuario.nome);
    setEditEmail(dadosUsuario.email);
    setModalEditarOpen(true);
  };

  const salvarPerfil = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3000/usuarios/${dadosUsuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: editNome, email: editEmail }),
      });

      if (resposta.ok) {
        mostrarPopup('Perfil atualizado com sucesso!', 'sucesso');
        setDadosUsuario({ ...dadosUsuario, nome: editNome, email: editEmail });
        
        localStorage.setItem('nomeUsuario', editNome);
        localStorage.setItem('emailUsuario', editEmail);
        
        setModalEditarOpen(false);
      } else {
        const erro = await resposta.json();
        mostrarPopup(erro.mensagem || 'Erro ao atualizar perfil.');
      }
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
    }
  };

  const salvarSenha = async (e) => {
    e.preventDefault();
    
    if (novaSenha !== confirmaSenha) {
      mostrarPopup('As novas senhas não coincidem!');
      return;
    }

    if (novaSenha.length < 6) {
      mostrarPopup('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3000/usuarios/${dadosUsuario.id}/senha`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      if (resposta.ok) {
        mostrarPopup('Senha alterada com sucesso!', 'sucesso');
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmaSenha('');
        setModalSenhaOpen(false);
      } else {
        const erro = await resposta.json();
        mostrarPopup(erro.mensagem || 'Erro ao alterar a senha.');
      }
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
    }
  };

  const confirmarDelecao = async () => {
    try {
      const resposta = await fetch(`http://localhost:3000/usuarios/${dadosUsuario.id}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        mostrarPopup('Conta deletada com sucesso!', 'sucesso');
        localStorage.clear();
        setModalDeletarOpen(false);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const erro = await resposta.json();
        mostrarPopup(erro.mensagem || 'Erro ao deletar conta.');
      }
    } catch (error) {
      mostrarPopup('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="perfil_layout">
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      <Sidebar paginaAtiva="perfil" />

      <main className="perfil_main">
        <header className="perfil_header">
          <h1 id="Titulo">Meu Perfil</h1>
        </header>

        <div className="perfil_content">
          <div id="Caixa_Perfil">
            <div className="Avatar_Circle">{inicial}</div>
            
            <div className="Info_Group">
              <span className="Label">Nome Completo</span>
              <span className="Value">{dadosUsuario.nome}</span>
            </div>

            <div className="Info_Group">
              <span className="Label">E-mail</span>
              <span className="Value">{dadosUsuario.email}</span>
            </div>

            <button className="Botao_Editar" onClick={abrirModalEditar}>Editar Informações</button>
            <button className="Botao_Senha" onClick={() => setModalSenhaOpen(true)}>Alterar Senha</button>
            <button className="Botao_Deletar" onClick={() => setModalDeletarOpen(true)}>Deletar Conta</button>
          </div>
        </div>
      </main>

      {modalEditarOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3>Editar Perfil</h3>
            <form onSubmit={salvarPerfil} className="modal_form">
              <input 
                type="text" 
                placeholder="Nome completo" 
                value={editNome} 
                onChange={(e) => setEditNome(e.target.value)} 
                required 
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                value={editEmail} 
                onChange={(e) => setEditEmail(e.target.value)} 
                required 
              />
              <div className="modal_botoes">
                <button type="button" className="btn_cancelar" onClick={() => setModalEditarOpen(false)}>Cancelar</button>
                <button type="submit" className="btn_salvar">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalSenhaOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3>Alterar Senha</h3>
            <form onSubmit={salvarSenha} className="modal_form">
              <input 
                type="password" 
                placeholder="Senha Atual" 
                value={senhaAtual} 
                onChange={(e) => setSenhaAtual(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Nova Senha" 
                value={novaSenha} 
                onChange={(e) => setNovaSenha(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Confirme a Nova Senha" 
                value={confirmaSenha} 
                onChange={(e) => setConfirmaSenha(e.target.value)} 
                required 
              />
              <div className="modal_botoes">
                <button type="button" className="btn_cancelar" onClick={() => setModalSenhaOpen(false)}>Cancelar</button>
                <button type="submit" className="btn_salvar">Atualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalDeletarOpen && (
        <div className="modal_overlay">
          <div className="modal_box">
            <h3 style={{ color: '#d32f2f' }}>Atenção!</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              Tem certeza que deseja deletar sua conta? Esta ação <strong>não pode ser desfeita</strong>.
            </p>
            <div className="modal_botoes">
              <button type="button" className="btn_cancelar" onClick={() => setModalDeletarOpen(false)}>Cancelar</button>
              <button type="button" className="btn_salvar" style={{ background: '#d32f2f' }} onClick={confirmarDelecao}>Sim, Deletar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Perfil;