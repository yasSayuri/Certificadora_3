require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

const Usuario = require('./models/Usuario');

// ==================== CADASTRO ====================
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    // Validação de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: 'E-mail inválido.' });
    }

    // Validação de senha (mínimo 6 caracteres)
    if (senha.length < 6) {
      return res.status(400).json({ erro: 'A senha deve conter no mínimo 6 caracteres.' });
    }

    // Verificar se e-mail já existe
    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }

    // Criptografar a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada
    });

    const usuarioSalvo = await novoUsuario.save();

    res.status(201).json({ 
      mensagem: 'Usuário cadastrado com sucesso!', 
      usuario: { 
        id: usuarioSalvo._id, 
        nome: usuarioSalvo.nome, 
        email: usuarioSalvo.email 
      } 
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

// ==================== LOGIN ====================
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação de campos obrigatórios
    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    // Buscar usuário pelo e-mail
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    // Comparar a senha informada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    res.status(200).json({ 
      mensagem: 'Login realizado com sucesso!', 
      usuario: { 
        id: usuario._id, 
        nome: usuario.nome, 
        email: usuario.email 
      } 
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});