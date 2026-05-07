import './Login.css';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarLogin = async (e) => {
    e.preventDefault();
    console.log('Tentativa de login:', { email, senha });
    alert('Login realizado (simulação)!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Acesso ao Sistema</h1>
      </div>

      <div id="Caixa_Login">
        <h2>Login</h2>
        <form onSubmit={realizarLogin} className="form_login">
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
          <button type="submit" className="Botao_Acessar">Entrar</button>
        </form>
        <p className="Trocar_Tela">Não tem conta? <span>Cadastre-se</span></p>
      </div>
    </div>
  );
}

export default Login;