import React, { useEffect, useState } from 'react';
import Sidebar from '../Componentes/Sidebar';
import './Certificados.css';

function Certificados() {
  const [popup, setPopup] = useState({ visivel: false, mensagem: '', tipo: '' });
  const [eventosBD, setEventosBD] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState({
    id: localStorage.getItem('idUsuario') || 1,
    nome: 'Participante'
  });

  const idUsuario = localStorage.getItem('idUsuario');

  const mostrarPopup = (mensagem, tipo = 'erro') => {
    setPopup({ visivel: true, mensagem, tipo });

    setTimeout(() => {
      setPopup({ visivel: false, mensagem: '', tipo: '' });
    }, 3000);
  };

  const idsIguais = (id1, id2) => {
    return String(id1 || '') === String(id2 || '');
  };

  const extrairNomeUsuario = (usuario) => {
    if (!usuario) {
      return '';
    }

    return usuario.nome || usuario.nomeCompleto || usuario.name || usuario.fullName || '';
  };

  const extrairIdUsuario = (usuario) => {
    if (!usuario) {
      return '';
    }

    return usuario._id || usuario.id || usuario.idUsuario || usuario.userId || '';
  };

  const obterUsuarioLocal = () => {
    const nomeSalvo =
      localStorage.getItem('nome') ||
      localStorage.getItem('nomeUsuario') ||
      localStorage.getItem('nomeCompleto') ||
      localStorage.getItem('usuarioNome');

    if (nomeSalvo) {
      return {
        id: idUsuario || 1,
        nome: nomeSalvo
      };
    }

    const chavesPossiveis = ['usuarioLogado', 'usuario', 'user'];

    for (const chave of chavesPossiveis) {
      const usuarioSalvo = localStorage.getItem(chave);

      if (usuarioSalvo) {
        try {
          const usuario = JSON.parse(usuarioSalvo);
          const usuarioDados = usuario.usuario || usuario.user || usuario.dados || usuario;

          return {
            id: extrairIdUsuario(usuarioDados) || idUsuario || 1,
            nome: extrairNomeUsuario(usuarioDados) || 'Participante'
          };
        } catch (erro) {
          return {
            id: idUsuario || 1,
            nome: 'Participante'
          };
        }
      }
    }

    return {
      id: idUsuario || 1,
      nome: 'Participante'
    };
  };

  const salvarUsuarioLocal = (usuario) => {
    if (!usuario || !usuario.nome || usuario.nome === 'Participante') {
      return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    localStorage.setItem('nomeUsuario', usuario.nome);
  };

  const buscarUsuarioPorId = async () => {
    const usuarioLocal = obterUsuarioLocal();

    if (usuarioLocal.nome && usuarioLocal.nome !== 'Participante') {
      setUsuarioLogado(usuarioLocal);
      return usuarioLocal;
    }

    if (!idUsuario) {
      setUsuarioLogado(usuarioLocal);
      return usuarioLocal;
    }

    try {
      const respostaUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);

      if (respostaUsuario.ok) {
        const dados = await respostaUsuario.json();
        const usuarioDados = dados.usuario || dados.user || dados.dados || dados;
        const nomeEncontrado = extrairNomeUsuario(usuarioDados);

        if (nomeEncontrado) {
          const usuarioEncontrado = {
            id: extrairIdUsuario(usuarioDados) || idUsuario,
            nome: nomeEncontrado
          };

          setUsuarioLogado(usuarioEncontrado);
          salvarUsuarioLocal(usuarioEncontrado);
          return usuarioEncontrado;
        }
      }
    } catch (erro) {
    }

    try {
      const respostaUsuarios = await fetch('http://localhost:3000/usuarios');

      if (respostaUsuarios.ok) {
        const dados = await respostaUsuarios.json();
        const usuarios = Array.isArray(dados) ? dados : dados.usuarios || dados.users || dados.dados || [];

        const usuarioEncontrado = usuarios.find(usuario =>
          idsIguais(usuario._id, idUsuario) ||
          idsIguais(usuario.id, idUsuario) ||
          idsIguais(usuario.idUsuario, idUsuario) ||
          idsIguais(usuario.userId, idUsuario)
        );

        if (usuarioEncontrado) {
          const nomeEncontrado = extrairNomeUsuario(usuarioEncontrado);

          if (nomeEncontrado) {
            const usuarioFinal = {
              id: extrairIdUsuario(usuarioEncontrado) || idUsuario,
              nome: nomeEncontrado
            };

            setUsuarioLogado(usuarioFinal);
            salvarUsuarioLocal(usuarioFinal);
            return usuarioFinal;
          }
        }
      }
    } catch (erro) {
    }

    setUsuarioLogado(usuarioLocal);
    return usuarioLocal;
  };

  useEffect(() => {
    buscarUsuarioPorId();
  }, [idUsuario]);

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/eventos');

        if (resposta.ok) {
          const dados = await resposta.json();
          setEventosBD(dados);
        } else {
          mostrarPopup('Erro ao buscar eventos.');
        }
      } catch (error) {
        mostrarPopup('Erro de conexão com o servidor.');
      } finally {
        setCarregando(false);
      }
    };

    buscarEventos();
  }, []);

  const converterData = (dataEvento) => {
    if (!dataEvento) return null;

    if (dataEvento.includes('/')) {
      const partes = dataEvento.split('/');

      if (partes.length === 3) {
        const [dia, mes, ano] = partes;
        return new Date(Number(ano), Number(mes) - 1, Number(dia));
      }
    }

    if (dataEvento.includes('-')) {
      const partes = dataEvento.split('-');

      if (partes.length === 3) {
        const [ano, mes, dia] = partes;
        return new Date(Number(ano), Number(mes) - 1, Number(dia));
      }
    }

    return new Date(dataEvento);
  };

  const formatarData = (dataEvento) => {
    const dataConvertida = converterData(dataEvento);

    if (!dataConvertida || Number.isNaN(dataConvertida.getTime())) {
      return dataEvento || '-';
    }

    return dataConvertida.toLocaleDateString('pt-BR');
  };

  const calcularCargaHoraria = (evento) => {
    if (evento.cargaHoraria) {
      return evento.cargaHoraria;
    }

    const inicio = evento.horarioInicio;
    const termino = evento.horarioTermino;

    if (!inicio || !termino) {
      return '-';
    }

    const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
    const [horaTermino, minutoTermino] = termino.split(':').map(Number);

    if (
      Number.isNaN(horaInicio) ||
      Number.isNaN(minutoInicio) ||
      Number.isNaN(horaTermino) ||
      Number.isNaN(minutoTermino)
    ) {
      return '-';
    }

    let minutosInicio = horaInicio * 60 + minutoInicio;
    let minutosTermino = horaTermino * 60 + minutoTermino;

    if (minutosTermino < minutosInicio) {
      minutosTermino += 24 * 60;
    }

    const diferenca = minutosTermino - minutosInicio;

    if (diferenca <= 0) {
      return '-';
    }

    const horas = Math.floor(diferenca / 60);
    const minutos = diferenca % 60;

    if (horas > 0 && minutos > 0) {
      return `${horas} ${horas === 1 ? 'hora' : 'horas'} e ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    }

    if (horas > 0) {
      return `${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    }

    return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
  };

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const eventosInscritos = eventosBD.filter(evento => {
    return evento.inscritos && evento.inscritos.some(inscrito => idsIguais(inscrito, idUsuario));
  });

  const eventosConcluidos = eventosInscritos.filter(evento => {
    const dataEvento = converterData(evento.data);

    if (evento.status === 'concluido' || evento.concluido === true) {
      return true;
    }

    if (!dataEvento || Number.isNaN(dataEvento.getTime())) {
      return false;
    }

    dataEvento.setHours(0, 0, 0, 0);
    return dataEvento < hoje;
  });

  const eventosFuturos = eventosInscritos.filter(evento => {
    const dataEvento = converterData(evento.data);

    if (evento.status === 'concluido' || evento.concluido === true) {
      return false;
    }

    if (!dataEvento || Number.isNaN(dataEvento.getTime())) {
      return true;
    }

    dataEvento.setHours(0, 0, 0, 0);
    return dataEvento >= hoje;
  });

  const escaparHtml = (texto = '') => {
    return String(texto)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  };

  const formatarNomeArquivo = (texto = '') => {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
  };

  const criarHtmlCertificado = (evento, nomeParticipanteAtualizado) => {
    const nomeParticipante = escaparHtml(nomeParticipanteAtualizado || usuarioLogado.nome || 'Participante');
    const nomeEvento = escaparHtml(evento.nome || evento.evento);
    const dataEvento = escaparHtml(formatarData(evento.data));
    const cargaHoraria = escaparHtml(calcularCargaHoraria(evento));
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    const nomeArquivo = formatarNomeArquivo(evento.nome || evento.evento || 'certificado');

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Certificado - ${nomeEvento}</title>

        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            color: #333;
          }

          .certificado {
            max-width: 900px;
            min-height: 600px;
            margin: 0 auto;
            background: white;
            border: 12px solid #6a1b9a;
            padding: 50px;
            text-align: center;
            box-sizing: border-box;
          }

          .titulo {
            font-size: 42px;
            color: #6a1b9a;
            margin-bottom: 20px;
            text-transform: uppercase;
          }

          .subtitulo {
            font-size: 20px;
            margin-bottom: 40px;
          }

          .nome {
            font-size: 34px;
            font-weight: bold;
            color: #ff8f00;
            margin: 25px 0;
          }

          .texto {
            font-size: 20px;
            line-height: 1.6;
            margin: 20px 0;
          }

          .evento {
            font-size: 26px;
            font-weight: bold;
            color: #6a1b9a;
            margin: 20px 0;
          }

          .rodape {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 30px;
            font-size: 16px;
          }

          .assinatura {
            width: 280px;
            text-align: center;
          }

          .assinatura_fake {
            font-family: "Brush Script MT", "Segoe Script", cursive;
            font-size: 32px;
            color: #333;
            margin-bottom: -2px;
          }

          .linha_assinatura {
            border-top: 1px solid #333;
            padding-top: 10px;
          }

          .cargo_assinatura {
            font-size: 15px;
            color: #333;
            margin-top: 4px;
          }

          .aviso_certificado {
            margin-top: 45px;
            padding: 14px 18px;
            border-radius: 10px;
            background: #f7f2fb;
            border: 1px solid #d8c4e8;
            color: #5d4770;
            font-size: 13px;
            line-height: 1.5;
          }

          .acoes {
            max-width: 900px;
            margin: 25px auto 0;
            text-align: center;
          }

          .acoes button {
            background: #ff8f00;
            color: white;
            border: none;
            padding: 12px 22px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin: 5px;
          }

          .acoes button:hover {
            background: #e67e00;
          }

          .aviso {
            max-width: 900px;
            margin: 15px auto;
            text-align: center;
            font-size: 14px;
            color: #666;
          }

          @media print {
            body {
              background: white;
              padding: 0;
            }

            .acoes,
            .aviso {
              display: none;
            }

            .certificado {
              border: 12px solid #6a1b9a;
              box-shadow: none;
              margin: 0;
              width: 100%;
              max-width: none;
              min-height: 100vh;
            }
          }
        </style>
      </head>

      <body>
        <div class="certificado">
          <h1 class="titulo">Certificado</h1>

          <p class="subtitulo">Certificamos que</p>

          <div class="nome">${nomeParticipante}</div>

          <p class="texto">
            participou do evento
          </p>

          <div class="evento">${nomeEvento}</div>

          <p class="texto">
            realizado em ${dataEvento}, com carga horária de ${cargaHoraria}.
          </p>

          <div class="rodape">
            <div>
              <strong>Data de emissão:</strong><br />
              ${dataEmissao}
            </div>

            <div class="assinatura">
              <div class="assinatura_fake">Mariana Lopes</div>
              <div class="linha_assinatura">Coordenação do Evento</div>
              <div class="cargo_assinatura">NoteBook Eventos Acadêmicos</div>
            </div>
          </div>

          <div class="aviso_certificado">
            Este documento é uma simulação de certificado gerada pela aplicação NoteBook para fins de demonstração acadêmica. Como o sistema ainda se encontra em fase de projeto e execução local, sem hospedagem em nuvem ou validação institucional, este certificado não possui validade oficial.
          </div>
        </div>

        <div class="acoes">
          <button onclick="window.print()">Imprimir / salvar como PDF</button>
          <button onclick="baixarHtml()">Baixar HTML</button>
        </div>

        <p class="aviso">
          Este certificado é apenas uma simulação gerada localmente para fins de demonstração do projeto.
        </p>

        <script>
          function baixarHtml() {
            const html = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'certificado_${nomeArquivo}.html';
            link.click();

            URL.revokeObjectURL(url);
          }
        </script>
      </body>
      </html>
    `;
  };

  const gerarCertificado = async (evento) => {
    const usuarioAtualizado = await buscarUsuarioPorId();
    const html = criarHtmlCertificado(evento, usuarioAtualizado.nome);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const novaAba = window.open(url, '_blank');

    if (!novaAba) {
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificado_${formatarNomeArquivo(evento.nome || evento.evento || 'certificado')}.html`;
      link.click();

      mostrarPopup('O navegador bloqueou a nova aba, então o certificado HTML foi baixado.', 'sucesso');
      return;
    }

    mostrarPopup('Certificado gerado com sucesso.', 'sucesso');

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  };

  return (
    <div className="dashboard_layout">
      {popup.visivel && (
        <div className={`popup_mensagem popup_${popup.tipo}`}>
          {popup.tipo === 'erro' ? '⚠️' : '✅'} {popup.mensagem}
        </div>
      )}

      <Sidebar paginaAtiva="certificados" />

      <main className="dashboard_main certificados_main">
        <header className="dashboard_header certificados_header">
          <h1 className="greeting">Meus Certificados</h1>
          <p className="titulo_dashboard">
            Visualize seus eventos concluídos e acompanhe os próximos eventos em que você está inscrito.
          </p>
        </header>

        <div className="certificados_content">
          <section id="Caixa_Certificados" className="Caixa_Certificados">
            <div className="Cabecalho_Certificados">
              <div>
                <h2>Eventos concluídos</h2>
                <p>Gere certificados simulados dos eventos finalizados.</p>
              </div>
            </div>

            <div className="Tabela_Scroll">
              <table className="Tabela_Certificados">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Data</th>
                    <th>Carga horária</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {carregando ? (
                    <tr>
                      <td colSpan="5" className="Mensagem_Vazia">
                        Carregando eventos...
                      </td>
                    </tr>
                  ) : eventosConcluidos.length > 0 ? (
                    eventosConcluidos.map(evento => (
                      <tr key={evento._id || evento.id}>
                        <td>{evento.nome || evento.evento}</td>
                        <td>{formatarData(evento.data)}</td>
                        <td>{calcularCargaHoraria(evento)}</td>
                        <td>
                          <span className="Status Status_Concluido">
                            Concluído
                          </span>
                        </td>
                        <td>
                          <button
                            className="Botao_Download"
                            onClick={() => gerarCertificado(evento)}
                          >
                            Gerar certificado
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="Mensagem_Vazia">
                        Nenhum evento concluído encontrado para este usuário.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="Caixa_Certificados">
            <div className="Cabecalho_Certificados">
              <div>
                <h2>Futuros eventos em que você está inscrito</h2>
                <p>Esses eventos ainda não possuem certificado disponível.</p>
              </div>
            </div>

            <div className="Tabela_Scroll">
              <table className="Tabela_Certificados">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Data</th>
                    <th>Carga horária</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {carregando ? (
                    <tr>
                      <td colSpan="4" className="Mensagem_Vazia">
                        Carregando eventos...
                      </td>
                    </tr>
                  ) : eventosFuturos.length > 0 ? (
                    eventosFuturos.map(evento => (
                      <tr key={evento._id || evento.id}>
                        <td>{evento.nome || evento.evento}</td>
                        <td>{formatarData(evento.data)}</td>
                        <td>{calcularCargaHoraria(evento)}</td>
                        <td>
                          <span className="Status Status_Inscrito">
                            Inscrito
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="Mensagem_Vazia">
                        Você não está inscrito em nenhum evento futuro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Certificados;