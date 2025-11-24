# Generic CRUD API

Uma API RESTful genérica construída com Node.js e Express 5, implementando operações CRUD (Create, Read, Update, Delete) com autenticação JWT, validação de dados e arquitetura modular.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção)
- **JWT** - Autenticação baseada em tokens
- **Zod** - Validação de schemas
- **bcryptjs** - Hash de senhas
- **Helmet** - Segurança HTTP
- **CORS** - Controle de acesso cross-origin
- **express-rate-limit** - Limitação de taxa de requisições

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- SQLite (para desenvolvimento)
- PostgreSQL (para produção, opcional)

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/IgorSasaki/generic-crud-api.git
cd generic-crud-api
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente (opcional):

```bash
# Crie um arquivo .env na raiz do projeto
PORT=3333
JWT_SECRET=seu-secret-super-seguro-aqui
JWT_EXPIRES_IN=15m
CORS_ORIGIN=*
NODE_ENV=development
```

## 🗄️ Banco de Dados

### Desenvolvimento (SQLite)

O banco SQLite é criado automaticamente na raiz do projeto (`database.sqlite`) quando a aplicação é iniciada.

### Seeders

Para popular o banco com dados de exemplo:

```bash
npx sequelize-cli db:seed:all
```

Isso criará:

- 2 usuários de exemplo (admin@email.com e user@email.com, senha: `senha123`)
- Vários reports de exemplo

## 🏃 Executando a Aplicação

### Modo Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

### Modo Produção

```bash
npm start
# ou
yarn start
```

A API estará disponível em `http://localhost:3333` (ou na porta configurada).

## 📚 Estrutura do Projeto

```
generic-crud-api/
├── src/
│   ├── config/           # Configurações (banco, env)
│   ├── database/          # Seeders e migrations
│   ├── middlewares/       # Middlewares (auth, validate, errorHandler)
│   ├── models/            # Modelos Sequelize (User, Report)
│   ├── modules/           # Módulos da aplicação
│   │   ├── users/         # Módulo de usuários
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repo.sequelize.js
│   │   │   └── user.schemas.js
│   │   └── reports/       # Módulo de reports
│   │       ├── report.controller.js
│   │       ├── report.service.js
│   │       ├── report.repo.sequelize.js
│   │       └── report.schemas.js
│   ├── routes/            # Definição de rotas
│   ├── utils/             # Utilitários
│   ├── app.js             # Configuração do Express
│   └── server.js          # Ponto de entrada
├── database.sqlite        # Banco SQLite (desenvolvimento)
├── package.json
└── README.md
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu_token>
```

## 📡 Endpoints da API

### Health Check

```
GET /health
```

Resposta:

```json
{
  "ok": true
}
```

### Autenticação

#### Registrar Usuário

```
POST /auth/register
```

Body:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

Resposta (201):

```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

#### Login

```
POST /auth/login
```

Body:

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

Resposta (200):

```json
{
  "accessToken": "jwt-token-aqui"
}
```

#### Obter Usuário Atual

```
GET /auth/me
```

Headers:

```
Authorization: Bearer <token>
```

Resposta (200):

```json
{
  "userId": "uuid-do-usuario"
}
```

### Reports

#### Listar Reports

```
GET /reports
```

Query Parameters (opcionais):

- `q` - Busca por título (busca parcial)
- `order` - Campo para ordenação (`id`, `title`, `createdAt`)
- `dir` - Direção da ordenação (`ASC`, `DESC`)
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10, máximo: 100)

Exemplo:

```
GET /reports?q=lenda&order=createdAt&dir=DESC&page=1&limit=10
```

Resposta (200):

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Título do Report",
      "content": "Conteúdo do report",
      "originLocation": "São Paulo",
      "createdBy": "uuid-do-usuario",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": "uuid",
        "name": "Nome do Usuário"
      }
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 50,
  "totalPages": 5
}
```

#### Obter Report por ID

```
GET /reports/:id
```

Resposta (200):

```json
{
  "id": "uuid",
  "title": "Título do Report",
  "content": "Conteúdo do report",
  "originLocation": "São Paulo",
  "createdBy": "uuid-do-usuario",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Criar Report

```
POST /reports
```

Headers:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "title": "Título do Report",
  "content": "Conteúdo do report",
  "originLocation": "São Paulo - Capital"
}
```

Resposta (201):

```json
{
  "id": "uuid",
  "title": "Título do Report",
  "content": "Conteúdo do report",
  "originLocation": "São Paulo - Capital",
  "createdBy": "uuid-do-usuario",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Atualizar Report

```
PATCH /reports/:id
```

Headers:

```
Authorization: Bearer <token>
```

Body (todos os campos são opcionais, mas pelo menos um deve ser enviado):

```json
{
  "title": "Novo Título",
  "content": "Novo Conteúdo",
  "originLocation": "Nova Localização"
}
```

Resposta (200):

```json
{
  "id": "uuid",
  "title": "Novo Título",
  "content": "Novo Conteúdo",
  "originLocation": "Nova Localização",
  "createdBy": "uuid-do-usuario",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Deletar Report

```
DELETE /reports/:id
```

Headers:

```
Authorization: Bearer <token>
```

Resposta (204): Sem conteúdo

## 🔒 Segurança

- **Helmet**: Protege contra vulnerabilidades HTTP comuns
- **CORS**: Configurável via variável de ambiente
- **Rate Limiting**: Limita a 100 requisições por minuto por IP
- **JWT**: Tokens com expiração configurável
- **bcryptjs**: Senhas hasheadas com salt rounds
- **Validação**: Todos os dados de entrada são validados com Zod

## 📝 Validações

### Usuário

- `name`: String, obrigatório, mínimo 1 caractere
- `email`: Email válido, obrigatório, único
- `password`: String, obrigatório, mínimo 6 caracteres

### Report

- `title`: String, obrigatório, mínimo 1 caractere
- `content`: String, obrigatório, mínimo 1 caractere
- `originLocation`: String, obrigatório, mínimo 1 caractere

## 🗂️ Modelos de Dados

### User

- `id`: UUID (primary key)
- `name`: String(100)
- `email`: String(255), único
- `passwordHash`: String(255)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Report

- `id`: UUID (primary key)
- `title`: String(100)
- `content`: String(255)
- `originLocation`: String(255)
- `createdBy`: UUID (foreign key para User)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## 🏗️ Arquitetura

A aplicação segue uma arquitetura em camadas:

1. **Routes**: Define as rotas e aplica middlewares
2. **Controllers**: Recebe requisições, valida e chama services
3. **Services**: Lógica de negócio
4. **Repositories**: Acesso aos dados (Sequelize)
5. **Models**: Definição dos modelos do banco de dados

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento (com watch mode)
npm run dev

# Produção
npm start

# Seeders
npx sequelize-cli db:seed:all

# Reverter seeders
npx sequelize-cli db:seed:undo:all
```

## 🐛 Tratamento de Erros

A API retorna erros em um formato padronizado:

```json
{
  "message": "Mensagem de erro",
  "code": "CODIGO_DO_ERRO",
  "details": null
}
```

Códigos de status HTTP:

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Sem conteúdo (delete)
- `400` - Erro de validação
- `401` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (ex: email já existe)
- `500` - Erro interno do servidor

## 📄 Licença

MIT

## 👤 Autor

Igor Sasaki - igor-sasaki@hotmail.com

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
