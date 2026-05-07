import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home_container">
      <div className="home_box">
        
        {/* LADO ESQUERDO: Degradê com os Textos */}
        <div className="home_left">
          <h1 className="home_titulo">NoteBook</h1>
          <p className="home_subtitulo">Organização para as meninas digitais!</p>
          <p className="home_contexto">
            Um aplicativo completo para organização de palestras, eventos e
            oficinas desenvolvidas pelo projeto Meninas Digitais da UTFPR-CP. 
            Gerencie sua agenda de forma rápida e intuitiva.
          </p>
        </div>

        {/* LADO DIREITO: Branco com Avatar e Botões */}
        <div className="home_right">
          {/* Avatar imitando o ícone da sua imagem de referência */}
          <div className="icon_placeholder">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="#7c06aa" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7"></path>
            </svg>
          </div>
          
          <h2 className="home_welcome">Bem-vindo(a)!</h2>
          <p className="home_instruction">Escolha uma opção para começar.</p>

          <div className="home_botoes">
            <Link to="/login" className="btn_entrar">Entrar</Link>
            <Link to="/cadastro" className="btn_cadastrar">Cadastrar</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;