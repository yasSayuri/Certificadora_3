import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });

  const navigate = useNavigate();

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  const realizarLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      mostrarPopup('Preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarPopup('E-mail inválido.');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        mostrarPopup(dados.erro || 'E-mail ou senha inválidos.');
        return;
      }

      localStorage.setItem('nomeUsuario', dados.usuario.nome);
      localStorage.setItem('emailUsuario', dados.usuario.email); 
      localStorage.setItem('idUsuario', dados.usuario.id);

      mostrarPopup('Login realizado com sucesso!', 'sucesso');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (erro) {
      mostrarPopup('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login_container">

      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      <div id="Caixa_Login">
        
        <div className="header_login">
          <Link to="/" className="botao_voltar" title="Voltar para Home">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#6a1b9a">
              <path d="M400-80 0-480l400-400 71 71-289 289h818v100H182l289 289-71 71Z"/>
            </svg>
          </Link>
        </div>

        <h2>Login</h2>
        <p className="login_subtitulo">Acesse sua conta no NoteBook.</p>
        
        <form onSubmit={realizarLogin} className="form_login">
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
          <button type="submit" className="Botao_Acessar">Entrar</button>
        </form>
        
        <p className="Trocar_Tela">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;