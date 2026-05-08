import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function GraficoEventos() {
  const dados = [
    { nome: 'Python', inscritos: 15, vagas: 20 },
    { nome: 'Arduino', inscritos: 8, vagas: 10 },
    { nome: 'HTML/CSS', inscritos: 25, vagas: 30 },
    { nome: 'Soft Skills', inscritos: 12, vagas: 15 }
  ];

  return (
    <div style={{ 
      background: 'white', 
      padding: '25px', 
      borderRadius: '15px', 
      width: '100%', 
      boxSizing: 'border-box',
      marginBottom: '25px', 
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ color: '#6a1b9a', marginBottom: '20px', fontFamily: 'sans-serif' }}>
        Inscrições por Evento
      </h2>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="nome" tick={{ fill: '#333' }} />
            <YAxis tick={{ fill: '#333' }} />
            <Tooltip 
              cursor={{fill: '#f0f0f0'}} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="inscritos" radius={[5, 5, 0, 0]}>
              {dados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6a1b9a' : '#ff8f00'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GraficoEventos;