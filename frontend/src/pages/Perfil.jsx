import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

      <aside className="sidebar">
        <h2 className="sidebar_logo">NoteBook</h2>
        
        <nav className="sidebar_nav">
          <Link to="/dashboard" className="nav_item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-80Zm240-240Zm-240 0Z"/></svg>
            Dashboard
          </Link>
          
          <Link to="/perfil" className="nav_item active">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            Meu Perfil
          </Link>
        </nav>

        <Link to="/" className="nav_logout" onClick={() => localStorage.clear()}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
            Sair
        </Link>
      </aside>

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