# 👩‍💻 Sistema de Agendamentos e Controle de Palestras

**🔗 Repositório Oficial:** https://github.com/yasSayuri/Certificadora_3
**▶️ Vídeo de Instalação e Execução:** https://drive.google.com/file/d/1QAS60eXoxNVeUrmizwsQNLOeaZ3FiRpo/view?usp=sharing

---

## 👥 Equipe Desenvolvedora (Grupo 9)

Alunos que participaram ativamente do desenvolvimento do sistema até a presente etapa:

* **Allan Guilherme de Oliveira Soares de Souza** (2454084)
* **Gustavo Alves de Aquino** (2503646)
* **Mario Issamu Barbuglio Morita** (2417812)
* **Yasmin Sayuri Matuzaki Cardoso** (2525550)

---

## 🎯 Objetivo do Sistema

O sistema proposto é uma plataforma digital voltada ao gerenciamento e organização das atividades do projeto de extensão Meninas Digitais UTFPR-CP.

O objetivo central é gerenciar o agendamento e controle de palestras, oficinas, rodas de conversa e demais eventos realizados pelo projeto, reduzindo o uso de processos manuais e melhorando a eficiência na organização das atividades.

A aplicação também permite o acompanhamento dos eventos por meio de gráficos, calendário interativo, controle de inscrições e geração de certificados simulados para os participantes inscritos em eventos já concluídos.

---

## 📝 Sobre o Projeto

O sistema, chamado **NoteBook**, foi desenvolvido como uma aplicação web com frontend em React e backend em Node.js. A persistência dos dados é feita em MongoDB, utilizando Mongoose para a comunicação entre a API e o banco.

A plataforma possui funcionalidades de cadastro, login, gerenciamento de perfil, criação e controle de eventos, inscrições, visualização em calendário, dashboard com indicadores e emissão local de certificados simulados.

O projeto foi desenvolvido com finalidade acadêmica e tem como foco facilitar a organização de atividades vinculadas ao projeto Meninas Digitais UTFPR-CP.

---

## ✨ Funcionalidades Desenvolvidas

* **Sistema de Autenticação:** telas de Home, Login e Cadastro operacionais, com proteção de senhas no banco via criptografia bcrypt.
* **Cadastro de Usuários:** cadastro com nome completo, e-mail e senha, permitindo que o nome cadastrado seja utilizado na saudação do dashboard e na geração dos certificados simulados.
* **Login de Usuários:** autenticação por e-mail e senha, com armazenamento dos dados do usuário logado no `localStorage`.
* **Painel de Controle (Dashboard):** tela central com menu lateral, saudação dinâmica ao usuário logado e área composta por gráficos.
* **Gráficos do Dashboard:** indicadores visuais de inscrições por evento, eventos realizados por mês, impacto do projeto na comunidade e participação das Meninas Digitais nos eventos, utilizando a biblioteca Recharts.
* **Gerenciamento de Perfil:** o usuário pode visualizar seus dados, editá-los, alterar sua senha ou excluir sua conta por meio de modais interativos.
* **Gerenciamento de Eventos:** tela de Lista de Eventos contendo o CRUD completo de oficinas e palestras.
* **Inscrição em Eventos:** o usuário pode se inscrever e cancelar sua inscrição em eventos.
* **Controle de Vagas:** o sistema verifica a quantidade de inscritos e impede novas inscrições quando o evento está lotado.
* **Bloqueio de Eventos Encerrados:** eventos já finalizados são exibidos como encerrados e não permitem novas inscrições.
* **Filtros de Eventos:** busca por nome, filtro por tipo, filtro por eventos com vagas disponíveis e filtro por eventos em que o usuário está inscrito.
* **Calendário Interativo:** calendário com filtros de Meus Eventos e Outros Eventos, navegação por meses, marcação do dia atual e visualização de eventos cadastrados.
* **Certificados Simulados:** página de certificados integrada às inscrições do usuário, exibindo eventos concluídos e eventos futuros.
* **Geração de Certificado Simulado:** emissão local de certificado em HTML para eventos concluídos, contendo nome completo do participante, nome do evento, data, carga horária calculada automaticamente e assinatura fictícia da coordenação.
* **Carga Horária Automática:** cálculo da carga horária com base na diferença entre o horário de início e o horário de término do evento.
* **Aviso de Validade do Certificado:** o certificado gerado informa que se trata de uma simulação acadêmica, sem validade oficial, por ser uma aplicação local e sem validação institucional.
* **Configurações do Sistema:** tela com dados do usuário conectado, versão do projeto, opção de sair da conta e opção de excluir a conta permanentemente.
* **Auto-população de Dados:** o sistema automaticamente cadastra um usuário padrão e uma lista de eventos estáticos no MongoDB na primeira inicialização para facilitar os testes.

---

## 🛠️ Ferramentas e Bibliotecas Utilizadas

### 1. Codificação, Compilação e Execução

* **Visual Studio Code:** IDE utilizada para o desenvolvimento do código.
* **Node.js:** ambiente de execução JavaScript utilizado no backend.
* **Git:** sistema de controle de versão utilizado no projeto.
* **npm:** gerenciador de pacotes utilizado para instalar as dependências do frontend e do backend.

### 2. Criação e Gerenciamento da Base de Dados

* **MongoDB Community Server:** banco de dados não relacional utilizado em ambiente local.
* **MongoDB Compass:** interface gráfica opcional para visualização e gerenciamento do banco de dados.

### 3. Bibliotecas do Frontend

* **React:** biblioteca JavaScript utilizada para construção da interface do usuário.
* **Vite:** ferramenta utilizada para criação e execução do projeto React.
* **React Router DOM:** biblioteca utilizada para gerenciamento de rotas e navegação entre páginas.
* **Recharts:** biblioteca utilizada para criação dos gráficos do dashboard.

### 4. Bibliotecas do Backend

* **Express:** framework utilizado para criação da API e das rotas do sistema.
* **Mongoose:** biblioteca utilizada para modelagem dos dados e conexão com o MongoDB.
* **bcrypt:** biblioteca utilizada para criptografia das senhas dos usuários.
* **cors:** middleware utilizado para permitir requisições entre frontend e backend.
* **dotenv:** biblioteca utilizada para carregar variáveis de ambiente a partir do arquivo `.env`.

---

## 📦 Versões das Principais Dependências

### Backend

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "mongoose": "^9.6.1"
}
```

### Frontend

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.18.0",
  "recharts": "^3.8.1",
  "vite": "^8.0.10"
}
```

---

## 📁 Estrutura do Projeto

```bash
Certificadora_3/
│
├── backend/
│   ├── models/
│   │   ├── Evento.js
│   │   └── Usuario.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Cadastro/
│   │   │   ├── Calendario/
│   │   │   ├── Certificados/
│   │   │   ├── Componentes/
│   │   │   ├── Configuracao/
│   │   │   ├── Dashboard/
│   │   │   ├── Home/
│   │   │   ├── ListaEventos/
│   │   │   ├── Login/
│   │   │   └── Perfil/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🗄️ Modelos do Banco de Dados

### Usuário

O modelo de usuário armazena os dados básicos necessários para autenticação e identificação do participante.

Campos principais:

* `nome`
* `email`
* `senha`

A senha é armazenada de forma criptografada utilizando bcrypt.

---

### Evento

O modelo de evento armazena as informações das oficinas, palestras e demais atividades cadastradas no sistema.

Campos principais:

* `nome`
* `data`
* `horarioInicio`
* `horarioTermino`
* `local`
* `vagas`
* `tipo`
* `inscritos`

O campo `inscritos` armazena os identificadores dos usuários inscritos no evento.

---

## 🔗 Rotas Principais da API

### Usuários

| Método | Rota                  | Descrição                         |
| ------ | --------------------- | --------------------------------- |
| POST   | `/usuarios`           | Cadastra um novo usuário          |
| POST   | `/login`              | Realiza login no sistema          |
| PUT    | `/usuarios/:id`       | Atualiza nome e e-mail do usuário |
| PUT    | `/usuarios/:id/senha` | Altera a senha do usuário         |
| DELETE | `/usuarios/:id`       | Exclui a conta do usuário         |

### Eventos

| Método | Rota                     | Descrição                                               |
| ------ | ------------------------ | ------------------------------------------------------- |
| GET    | `/eventos`               | Lista todos os eventos                                  |
| POST   | `/eventos`               | Cria um novo evento                                     |
| PUT    | `/eventos/:id`           | Atualiza um evento existente                            |
| DELETE | `/eventos/:id`           | Exclui um evento                                        |
| POST   | `/eventos/:id/inscrever` | Inscreve ou cancela a inscrição do usuário em um evento |

---

## 🗄️ Roteiro: Como Criar e Executar a Base de Dados

1. Faça o download e instale o **MongoDB Community Server**.
2. Durante a instalação no Windows, mantenha marcada a opção **Install MongoDB as a Service**.
3. Essa opção faz com que o MongoDB seja iniciado automaticamente em segundo plano, geralmente utilizando a porta padrão `27017`.
4. Não é necessário criar o banco manualmente.
5. Ao executar a aplicação, o Mongoose cria automaticamente o banco chamado `Certificadora_3` e suas coleções.
6. Caso queira visualizar os dados de forma gráfica, utilize o **MongoDB Compass**.

---

## 🚀 Roteiro: Como Compilar e Executar o Projeto

### Passo 1: Clonar o repositório

Abra o terminal de sua preferência e clone o repositório oficial:

```bash
git clone https://github.com/yasSayuri/Certificadora_3.git
cd Certificadora_3
```

---

### Passo 2: Executar o Backend

No terminal, acesse a pasta do backend:

```bash
cd backend
```

Instale todas as dependências do backend:

```bash
npm install
```

Crie um arquivo chamado `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/Certificadora_3
```

Inicie o servidor local:

```bash
node server.js
```

Se tudo estiver correto, o terminal exibirá mensagens informando que o servidor está rodando e que a conexão com o MongoDB foi realizada com sucesso.

A API ficará disponível em:

```bash
http://localhost:3000
```

---

### Passo 3: Executar o Frontend

Sem fechar o terminal do backend, abra uma nova guia ou janela de terminal.

Se estiver na pasta `backend`, volte para a raiz do projeto e acesse a pasta do frontend:

```bash
cd ../frontend
```

Caso já esteja na raiz do projeto, utilize:

```bash
cd frontend
```

Instale as dependências do frontend:

```bash
npm install
```

Inicie o servidor de desenvolvimento web:

```bash
npm run dev
```

O terminal exibirá um link, geralmente:

```bash
http://localhost:5173
```

Segure a tecla CTRL e clique no link para abrir o sistema no navegador.

---

## 🧭 Páginas do Sistema

| Página           | Rota            | Descrição                                                  |
| ---------------- | --------------- | ---------------------------------------------------------- |
| Home             | `/`             | Tela inicial do sistema                                    |
| Cadastro         | `/cadastro`     | Tela de cadastro de usuários                               |
| Login            | `/login`        | Tela de autenticação                                       |
| Dashboard        | `/dashboard`    | Painel com gráficos e indicadores                          |
| Perfil           | `/perfil`       | Gerenciamento dos dados do usuário                         |
| Lista de Eventos | `/listaEventos` | Listagem, criação, edição, exclusão e inscrição em eventos |
| Calendário       | `/calendario`   | Visualização dos eventos em calendário                     |
| Certificados     | `/certificados` | Visualização e geração de certificados simulados           |
| Configurações    | `/configuracao` | Configurações da conta e do sistema                        |

---

## 📜 Observações sobre os Certificados

Os certificados gerados pelo sistema são apenas simulações acadêmicas.

Eles não possuem validade oficial, pois a aplicação é executada localmente e não possui validação institucional.

O certificado pode ser aberto em uma nova aba do navegador, impresso, salvo como PDF ou baixado como arquivo HTML.

---

## ⚠️ Observações Importantes

* O backend deve estar rodando na porta `3000` para que o frontend consiga se comunicar com a API.
* O MongoDB precisa estar ativo para que os dados sejam salvos corretamente.
* O frontend realiza requisições para `http://localhost:3000`.
* Os dados do usuário logado são armazenados no `localStorage` do navegador.
* A aplicação foi desenvolvida para fins acadêmicos.
* Os certificados gerados são apenas demonstrativos e não possuem validade oficial.
* A aplicação ainda não possui autenticação com token JWT.
* A aplicação ainda não possui controle de permissões por tipo de usuário.
* A aplicação ainda não possui hospedagem em nuvem.

---

## 🔮 Possíveis Melhorias Futuras

* Implementar autenticação com JWT.
* Criar controle de permissões para administrador e participante.
* Criar rota específica para buscar usuário por ID.
* Criar rota para listar todos os usuários.
* Melhorar a validação de datas e horários dos eventos.
* Impedir criação de eventos com data anterior à data atual.
* Adicionar confirmação de presença em eventos.
* Gerar certificados em PDF diretamente pelo sistema.
* Implementar upload de assinatura ou logotipo oficial.
* Criar área administrativa separada.
* Adicionar responsividade completa para dispositivos móveis.
* Publicar a aplicação em ambiente online.
