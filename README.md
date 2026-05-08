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
O sistema proposto é uma plataforma digital voltada ao gerenciamento e organização das atividades do projeto de extensão Meninas Digitais UTFPR-CP. O objetivo central é gerenciar o agendamento e controle de palestras, oficinas, rodas de conversa e demais eventos realizados pelo projeto, reduzindo o uso de processos manuais e melhorando a eficiência na organização das atividades.

## ✨ Funcionalidades Desenvolvidas (Entrega Parcial 1)
Nesta primeira entrega, a base da arquitetura e as principais interfaces do sistema já foram consolidadas e integradas ao banco de dados:
- Sistema de Autenticação: Telas de Home, Login e Cadastro operacionais, com proteção de senhas no banco via criptografia bcrypt.
- Painel de Controle (Dashboard): Tela central com menu lateral (Sidebar) componente, layout moderno em Glassmorphism, saudação dinâmica ao usuário logado e Gráfico de Inscrições plotado dinamicamente com a biblioteca recharts.
- Gerenciamento de Perfil: O usuário pode visualizar seus dados, editá-los, alterar sua senha ou excluir sua conta (CRUD de Usuários) através de modais interativos.
- Gerenciamento de Eventos: Tela de "Lista de Eventos" contendo o CRUD completo (Criar, Editar e Excluir) de oficinas e palestras, além de permitir que o usuário se inscreva/cancele inscrição.
- Calendário Interativo: Calendário com filtros ("Meus Eventos" e "Outros Eventos"), navegação por meses, marcação do dia atual e visualização de eventos cadastrados.
- Auto-população de Dados: O sistema automaticamente cadastra uma lista de eventos estáticos no MongoDB na primeira inicialização para facilitar os testes.

## 🛠️ Ferramentas e Bibliotecas Utilizadas

### 1. Codificação, Compilação e Execução
* **[Visual Studio Code](https://code.visualstudio.com/):** (v1.88+) - IDE padrão utilizada para o desenvolvimento de todo o código[cite: 2].
* **[Node.js](https://nodejs.org/):** (v20.x+) - Ambiente de execução JavaScript no servidor utilizado no backend[cite: 2].
* **[Git](https://git-scm.com/):** (v2.44+) - Sistema de controle de versão distribuído[cite: 2].

### 2. Criação e Hospedagem da Base de Dados
* **[MongoDB Community Server](https://www.mongodb.com/try/download/community):** (v7.0+) - Banco de dados não relacional rodando em ambiente local.
* **[MongoDB Compass](https://www.mongodb.com/products/tools/compass):** (v1.42+) - Interface gráfica para visualização e gerenciamento das tabelas do banco.

### 3. Bibliotecas Complementares
* **Frontend:**
  * **[React](https://react.dev/):** (v18.x) Biblioteca JavaScript para construção da interface do usuário (Inicializado via Vite).
  * **React Router Dom: Gerenciamento de rotas e navegação sem recarregar a página.
  * **Recharts: Biblioteca para a plotagem dos gráficos de análise no Dashboard.
* **Backend:**
  * **[Express](https://expressjs.com/):** (v4.x) Framework para Node.js utilizado para criação da API e rotas[cite: 2].
  * **[Mongoose](https://mongoosejs.com/):** (v8.x) Biblioteca para modelagem de objetos e conexão com o MongoDB.
  * **Cors / Dotenv:** Middlewares para permitir requisições de portas diferentes e proteger variáveis de ambiente.
  * **Bcrypt: Utilizada para garantir a segurança através da criptografia de senhas.

---

## 🗄️ Roteiro: Como Criar e Executar a Base de Dados

1. Faça o download e instale o **MongoDB Community Server** (link na seção de ferramentas). 
2. Durante a instalação no Windows, certifique-se de deixar a opção **"Install MongoD as a Service"** marcada. Isso fará com que o motor do banco de dados inicie automaticamente em segundo plano (porta padrão `27017`).
3. **Não é necessário criar o banco manualmente.** Ao executar a aplicação e realizar o primeiro cadastro, o banco chamado `Certificadora_3` e suas coleções serão gerados de forma totalmente automatizada pelo Mongoose.

---

## 🚀 Roteiro: Como Compilar e Executar o Projeto

### Passo 1: Salvar o código
Abra o terminal de sua preferência e clone o repositório oficial:
```bash
git clone [https://github.com/yasSayuri/Certificadora_3.git](https://github.com/yasSayuri/Certificadora_3.git)
cd Certificadora_3
```
### Passo 2: Executar o Backend (Servidor/API)
No terminal, acesse a pasta do backend:

```Bash
cd backend
```
Instale todas as dependências do Node:

```Bash
npm install
npm install bcrypt
```

Para garantir que a navegação do site e os gráficos do painel de controle funcionem perfeitamente, certifique-se de instalar o Router e o Recharts:

```Bash
npm install bcrypt
```

Crie um arquivo chamado .env na raiz da pasta backend com o seguinte conteúdo para conectar com o banco local:

```bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/Certificadora_3
```

Inicie o servidor local:
```bash
node server.js
```

Passo 3: Executar o Frontend (Interface Web)
Sem fechar o terminal do backend, abra uma nova guia/janela de terminal e acesse a pasta do frontend:

```Bash
cd frontend
```
Instale as dependências do React:

```Bash
npm install
```

Para garantir que a navegação do site e os gráficos do painel de controle funcionem perfeitamente, certifique-se de instalar o Router e o Recharts:

```Bash
npm install react-router-dom
npm install recharts
```
Inicie o servidor de desenvolvimento web:
```Bash
npm run dev
```
O terminal exibirá um link (geralmente http://localhost:5173). Segure a tecla CTRL e clique no link para abrir o sistema no navegador.
