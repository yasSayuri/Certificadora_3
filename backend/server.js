require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const Usuario = require('./models/Usuario');
const Evento = require('./models/Evento');

const app = express();

app.use(cors());
app.use(express.json());

const popularBanco = async () => {
  try {
    const countUsuarios = await Usuario.countDocuments();
    if (countUsuarios === 0) {
      const senhaCriptografada = await bcrypt.hash('admin123', 10);
      const admin = new Usuario({
        nome: 'Admin',
        email: 'admin@utfpr.edu.br',
        senha: senhaCriptografada
      });
      await admin.save();
      console.log('Admin padrao criado com sucesso!');
    }

    const countEventos = await Evento.countDocuments();
    if (countEventos === 0) {
      const eventosEstaticos = [
        { nome: "Oficina de Python", data: "15/05/2026", horarioInicio: "14:00", horarioTermino: "16:00", local: "Laboratório 1", vagas: 10, tipo: "Oficina", inscritos: [] },
        { nome: "Palestra: Mulheres na Tecnologia", data: "20/05/2026", horarioInicio: "19:00", horarioTermino: "21:00", local: "Auditório Principal", vagas: 50, tipo: "Palestra", inscritos: [] },
        { nome: "Introdução ao Arduino", data: "22/05/2026", horarioInicio: "08:00", horarioTermino: "12:00", local: "Laboratório Maker", vagas: 5, tipo: "Oficina", inscritos: [] },
        { nome: "Workshop de React", data: "05/06/2026", horarioInicio: "09:00", horarioTermino: "12:00", local: "Laboratório 3", vagas: 25, tipo: "Oficina", inscritos: [] },
        { nome: "Palestra: Inteligência Artificial", data: "30/05/2026", horarioInicio: "19:30", horarioTermino: "21:30", local: "Auditório Principal", vagas: 100, tipo: "Palestra", inscritos: [] },
        { nome: "UX/UI Design para Iniciantes", data: "25/05/2026", horarioInicio: "14:00", horarioTermino: "17:00", local: "Sala 204", vagas: 20, tipo: "Oficina", inscritos: [] }
      ];
      await Evento.insertMany(eventosEstaticos);
      console.log('Eventos estaticos inseridos no banco com sucesso!');
    }
  } catch (erro) {
    console.error('Erro ao popular o banco de dados:', erro);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    popularBanco();
  })
  .catch((erro) => {
    console.error('Erro ao conectar no MongoDB:', erro);
  });

app.get('/', (req, res) => {
  res.send('API do Meninas Digitais UTFPR-CP está rodando!');
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: 'E-mail inválido.' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ erro: 'A senha deve conter no mínimo 6 caracteres.' });
    }

    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }

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

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

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

app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Nome e e-mail são obrigatórios.' });
    }

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, email },
      { new: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

app.put('/usuarios/:id/senha', async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ mensagem: 'Preencha todas as senhas.' });
    }

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'A senha atual está incorreta.' });
    }

    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10);
    usuario.senha = novaSenhaCriptografada;
    await usuario.save();

    res.status(200).json({ mensagem: 'Senha alterada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Conta deletada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

app.post('/eventos', async (req, res) => {
  try {
    const { nome, data, horarioInicio, horarioTermino, local, vagas, tipo } = req.body;

    if (!nome || !data || !horarioInicio || !horarioTermino || !local || !vagas || !tipo) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const novoEvento = new Evento({
      nome, data, horarioInicio, horarioTermino, local, vagas, tipo
    });

    const eventoSalvo = await novoEvento.save();
    res.status(201).json(eventoSalvo);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.status(200).json(eventos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno do servidor.', detalhes: erro.message });
  }
});

app.put('/eventos/:id', async (req, res) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(eventoAtualizado);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar evento' });
  }
});

app.delete('/eventos/:id', async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensagem: 'Evento deletado' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar evento' });
  }
});

app.post('/eventos/:id/inscrever', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    const { usuarioId } = req.body;

    if (!usuarioId) return res.status(400).json({ erro: 'ID do usuário necessário' });

    if (evento.inscritos.includes(usuarioId)) {
      evento.inscritos = evento.inscritos.filter(id => id !== usuarioId);
    } else {
      evento.inscritos.push(usuarioId);
    }

    await evento.save();
    res.status(200).json({ evento });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao processar inscrição' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});