import './Cadastro.css';
import { useState } from 'react';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const realizarCadastro = async (e) => {
    e.preventDefault();

    const dadosDoFormulario = { nome, email, senha };

    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosDoFormulario),
      });

      if (resposta.ok) {
        alert('Cadastro salvo no banco com sucesso! 🎉');
        setNome(''); setEmail(''); setSenha('');
      } else {
        alert('Erro ao salvar no banco.');
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Tela de Cadastro</h1>
      </div>

      <div id="Caixa_Cadastro">
        <h2>Cadastro</h2>
        
        <form onSubmit={realizarCadastro} className="form_cadastro">
          <input 
            type="text" 
            placeholder="Nome completo" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
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
          <button type="submit" style={{ 
            padding: '12px', 
            background: '#6a1b9a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer' 
          }}>
            Salvar no Banco
          </button>
        </form>
      </div>     
    </div>
  );
}

export default Cadastro;