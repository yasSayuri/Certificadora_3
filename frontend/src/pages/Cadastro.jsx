import './Cadastro.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const navigate = useNavigate();

  const realizarCadastro = (e) => {
    e.preventDefault();

    navigate('/dashboard');
  };

  return (
    <div className="cadastro_container">
      <div id="Caixa_Cadastro">
        
        <div className="header_cadastro">
          <Link to="/" className="botao_voltar" title="Voltar para Home">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#6a1b9a">
              <path d="M400-80 0-480l400-400 71 71-289 289h818v100H182l289 289-71 71Z"/>
            </svg>
          </Link>
        </div>

        <h2>Cadastro</h2>
        <p className="cadastro_subtitulo">Junte-se ao NoteBook hoje mesmo.</p>
        
        <form onSubmit={realizarCadastro} className="form_cadastro">
          <input 
            type="text" 
            placeholder="Nome completo" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            /* required removido */
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            /* required removido */
          />
          <button type="submit" className="Botao_Cadastrar">
            Cadastrar
          </button>
        </form>

        <p className="Trocar_Tela">
          Já possui um cadastro? <Link to="/login">Faça Login</Link>
        </p>
      </div>    
    </div>
  );
}

export default Cadastro;