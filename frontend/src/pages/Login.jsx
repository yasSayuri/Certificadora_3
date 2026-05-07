import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const navigate = useNavigate();

  const realizarLogin = (e) => {
    e.preventDefault();
    
    navigate('/dashboard');
  };

  return (
    <div className="login_container">
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