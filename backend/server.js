require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('📦 Conectado ao MongoDB com sucesso!');
  })
  .catch((erro) => {
    console.error('❌ Erro ao conectar no MongoDB:', erro);
  });

app.get('/', (req, res) => {
  res.send('🚀 API do Meninas Digitais UTFPR-CP está rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const Usuario = require('./models/Usuario');

app.post('/usuarios', async (req, res) => {
  try {
    const novoUsuario = new Usuario(req.body);
    const usuarioSalvo = await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário salvo com sucesso!', usuario: usuarioSalvo });
  } catch (erro) {
    res.status(400).json({ erro: 'Erro ao cadastrar', detalhes: erro.message });
  }
});