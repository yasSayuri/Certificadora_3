import { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line
} from 'recharts';

function GraficoEventos() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/eventos');

        if (resposta.ok) {
          const dados = await resposta.json();
          setEventos(dados);
        }
      } catch (erro) {
        setEventos([]);
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

  const calcularCargaHoraria = (evento) => {
    if (evento.cargaHoraria) {
      const numero = parseFloat(String(evento.cargaHoraria).replace(',', '.'));
      return Number.isNaN(numero) ? 0 : numero;
    }

    const inicio = evento.horarioInicio;
    const termino = evento.horarioTermino;

    if (!inicio || !termino) {
      return 0;
    }

    const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
    const [horaTermino, minutoTermino] = termino.split(':').map(Number);

    if (
      Number.isNaN(horaInicio) ||
      Number.isNaN(minutoInicio) ||
      Number.isNaN(horaTermino) ||
      Number.isNaN(minutoTermino)
    ) {
      return 0;
    }

    let minutosInicio = horaInicio * 60 + minutoInicio;
    let minutosTermino = horaTermino * 60 + minutoTermino;

    if (minutosTermino < minutosInicio) {
      minutosTermino += 24 * 60;
    }

    const diferenca = minutosTermino - minutosInicio;

    if (diferenca <= 0) {
      return 0;
    }

    return Number((diferenca / 60).toFixed(1));
  };

  const dados = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const eventosOrdenados = [...eventos].sort((a, b) => {
      const dataA = converterData(a.data);
      const dataB = converterData(b.data);

      if (!dataA || !dataB) return 0;

      return dataA - dataB;
    });

    const inscritosPorEvento = eventosOrdenados.slice(0, 5).map(evento => {
      const inscritos = Array.isArray(evento.inscritos) ? evento.inscritos.length : 0;

      return {
        nome: evento.nome || evento.evento || 'Evento',
        inscritos
      };
    });

    const palavrasMeninasDigitais = [
      'mulher',
      'mulheres',
      'menina',
      'meninas',
      'digital',
      'digitais',
      'tecnologia',
      'programação',
      'programacao',
      'computação',
      'computacao',
      'ia',
      'inteligência artificial',
      'inteligencia artificial'
    ];

    const eventosMeninasDigitais = eventos.filter(evento => {
      const texto = `${evento.nome || ''} ${evento.evento || ''} ${evento.tipo || ''}`.toLowerCase();

      return palavrasMeninasDigitais.some(palavra => texto.includes(palavra));
    });

    const outrosEventos = eventos.filter(evento => {
      const texto = `${evento.nome || ''} ${evento.evento || ''} ${evento.tipo || ''}`.toLowerCase();

      return !palavrasMeninasDigitais.some(palavra => texto.includes(palavra));
    });

    const eventosRealizadosPorMes = Object.values(
      eventosMeninasDigitais.reduce((acc, evento) => {
        const dataEvento = converterData(evento.data);

        if (!dataEvento || Number.isNaN(dataEvento.getTime())) {
          return acc;
        }

        dataEvento.setHours(0, 0, 0, 0);

        if (dataEvento > hoje) {
          return acc;
        }

        const chave = `${String(dataEvento.getMonth() + 1).padStart(2, '0')}/${dataEvento.getFullYear()}`;

        if (!acc[chave]) {
          acc[chave] = {
            mes: chave,
            eventos: 0
          };
        }

        acc[chave].eventos += 1;

        return acc;
      }, {})
    );

    const totalInscricoesMeninasDigitais = eventosMeninasDigitais.reduce((total, evento) => {
      return total + (Array.isArray(evento.inscritos) ? evento.inscritos.length : 0);
    }, 0);

    const totalInscricoesOutrosEventos = outrosEventos.reduce((total, evento) => {
      return total + (Array.isArray(evento.inscritos) ? evento.inscritos.length : 0);
    }, 0);

    const totalHorasMeninasDigitais = eventosMeninasDigitais.reduce((total, evento) => {
      return total + calcularCargaHoraria(evento);
    }, 0);

    const eventosRealizadosMeninasDigitais = eventosMeninasDigitais.filter(evento => {
      const dataEvento = converterData(evento.data);

      if (!dataEvento || Number.isNaN(dataEvento.getTime())) {
        return false;
      }

      dataEvento.setHours(0, 0, 0, 0);
      return dataEvento <= hoje;
    }).length;

    const certificadosSimulados = eventosMeninasDigitais.reduce((total, evento) => {
      const dataEvento = converterData(evento.data);

      if (!dataEvento || Number.isNaN(dataEvento.getTime())) {
        return total;
      }

      dataEvento.setHours(0, 0, 0, 0);

      if (dataEvento <= hoje) {
        return total + (Array.isArray(evento.inscritos) ? evento.inscritos.length : 0);
      }

      return total;
    }, 0);

    const impactoComunidade = [
      {
        indicador: 'Pessoas',
        valor: totalInscricoesMeninasDigitais
      },
      {
        indicador: 'Eventos',
        valor: eventosRealizadosMeninasDigitais
      },
      {
        indicador: 'Horas',
        valor: totalHorasMeninasDigitais
      },
      {
        indicador: 'Certificados',
        valor: certificadosSimulados
      }
    ];

    const participacaoMeninasDigitais = [
      {
        nome: 'Meninas Digitais',
        quantidade: totalInscricoesMeninasDigitais
      },
      {
        nome: 'Outras pessoas',
        quantidade: totalInscricoesOutrosEventos
      }
    ];

    const participacaoSemDados = participacaoMeninasDigitais.every(item => item.quantidade === 0);

    return {
      inscritosPorEvento,
      eventosRealizadosPorMes,
      impactoComunidade,
      participacaoMeninasDigitais,
      participacaoSemDados
    };
  }, [eventos]);

  const cores = ['#6a1b9a', '#ff8f00', '#8e24aa', '#f9a825', '#7b1fa2', '#fb8c00'];

  const cardStyle = {
    background: 'white',
    padding: '10px 16px',
    borderRadius: '15px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 0,
    overflow: 'hidden'
  };

  const tituloStyle = {
    color: '#6a1b9a',
    margin: '0 0 4px 0',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    textAlign: 'center',
    flexShrink: 0,
    lineHeight: '1.1'
  };

  const areaGraficoStyle = {
    width: '100%',
    flex: 1,
    minHeight: 0
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
    gap: '12px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    minHeight: 0
  };

  const mensagemStyle = {
    background: 'white',
    padding: '35px',
    borderRadius: '15px',
    color: '#666',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
    fontFamily: 'sans-serif'
  };

  const mensagemCardStyle = {
    color: '#777',
    fontSize: '14px',
    textAlign: 'center',
    margin: 'auto',
    fontFamily: 'sans-serif'
  };

  if (carregando) {
    return (
      <div style={mensagemStyle}>
        Carregando gráficos...
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div style={mensagemStyle}>
        Nenhum evento encontrado para gerar os gráficos.
      </div>
    );
  }

  return (
    <div style={gridStyle}>
      <div style={cardStyle}>
        <h2 style={tituloStyle}>Inscrições por evento</h2>

        <div style={areaGraficoStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados.inscritosPorEvento} margin={{ top: 2, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tick={false} height={5} />
              <YAxis tick={{ fill: '#333', fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="inscritos" name="Inscritos" radius={[5, 5, 0, 0]}>
                {dados.inscritosPorEvento.map((entry, index) => (
                  <Cell key={`inscritos-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={tituloStyle}>Eventos realizados por mês</h2>

        <div style={areaGraficoStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dados.eventosRealizadosPorMes} margin={{ top: 2, right: 15, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" tick={{ fill: '#333', fontSize: 11 }} height={18} />
              <YAxis tick={{ fill: '#333', fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="eventos" name="Eventos realizados" stroke="#6a1b9a" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={tituloStyle}>Impacto do projeto na comunidade</h2>

        <div style={areaGraficoStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados.impactoComunidade} margin={{ top: 2, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="indicador" tick={{ fill: '#333', fontSize: 11 }} height={18} />
              <YAxis tick={{ fill: '#333', fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="valor" name="Quantidade" radius={[5, 5, 0, 0]}>
                {dados.impactoComunidade.map((entry, index) => (
                  <Cell key={`impacto-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={tituloStyle}>Participação das Meninas Digitais nos eventos</h2>

        <div style={areaGraficoStyle}>
          {dados.participacaoSemDados ? (
            <p style={mensagemCardStyle}>Ainda não há inscrições suficientes para gerar este gráfico.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dados.participacaoMeninasDigitais}
                  dataKey="quantidade"
                  nameKey="nome"
                  cx="50%"
                  cy="45%"
                  innerRadius={35}
                  outerRadius={58}
                  paddingAngle={3}
                  label
                >
                  {dados.participacaoMeninasDigitais.map((entry, index) => (
                    <Cell key={`participacao-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" height={20} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default GraficoEventos;