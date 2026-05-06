import React from 'react';
import './Perfil.css';

function Perfil({ usuario }) {
  const dados = usuario || {
    nome: "Ana Beatriz",
    email: "ana.beatriz@utfpr.edu.br",
  };

  const inicial = dados.nome.charAt(0).toUpperCase();

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div className="Header_Container">
        <h1 id="Titulo">Meu Perfil</h1>
      </div>

      <div id="Caixa_Perfil">
        <div className="Avatar_Circle">{inicial}</div>
        
        <div className="Info_Group">
          <span className="Label">Nome Completo</span>
          <span className="Value">{dados.nome}</span>
        </div>

        <div className="Info_Group">
          <span className="Label">E-mail</span>
          <span className="Value">{dados.email}</span>
        </div>

        <button className="Botao_Editar">Editar Informações</button>
      </div>
    </div>
  );
}

export default Perfil;