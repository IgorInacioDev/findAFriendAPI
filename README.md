# Documentação do Projeto

## Frameworks Utilizados

- Express.js: Um framework web rápido, flexível e minimalista para Node.js.
- TypeORM: Um ORM (Object-Relational Mapping) baseado em TypeScript para Node.js.
- Jest: Uma estrutura de teste de JavaScript.
- Fastify: Um framework web extensível e de alto desempenho para Node.js.
- Zod: Uma biblioteca de esquemas para validação de dados em JavaScript e TypeScript.
- Bcrypt.js: Uma biblioteca para hashing de senhas em JavaScript.

## Funcionalidade 1: Autenticação de Usuário

### Autenticação com JWT

A funcionalidade de autenticação de usuário permite que os usuários se autentiquem no sistema usando JSON Web Tokens (JWT). O processo de autenticação segue os seguintes passos:

1. O usuário envia uma solicitação de autenticação com seu nome de usuário (ou email) e senha.
2. O servidor verifica se as credenciais do usuário são válidas.
3. Se as credenciais forem válidas, o servidor gera um token JWT assinado contendo informações do usuário (como ID e papel).
4. O token JWT é retornado como resposta ao cliente.
5. O cliente armazena o token JWT e o envia em todas as solicitações subsequentes como um cabeçalho de autorização.
6. O servidor verifica a validade e a integridade do token JWT em cada solicitação para autenticar o usuário.

#### Rotas de Autenticação

- `POST /auth/signup`: Rota para criar uma nova conta de usuário. Os seguintes dados são enviados no corpo da solicitação: nome, email e senha. O servidor valida os dados e cria um novo usuário no banco de dados. Se bem-sucedido, retorna um token JWT para autenticação subsequente.

Exemplo de solicitação:
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- `POST /auth/login`: Rota para autenticar um usuário existente. Os seguintes dados são enviados no corpo da solicitação: nome de usuário (ou email) e senha. O servidor valida as credenciais e, se corretas, retorna um token JWT para autenticação subsequente.

Exemplo de solicitação:
```http
POST /auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

- `GET /auth/logout`: Rota para encerrar a sessão de um usuário. O servidor invalida o token JWT do usuário, tornando-o inválido para autenticação subsequente.

Exemplo de solicitação:
```http
GET /auth/logout
Authorization: Bearer {token}
```

## Funcionalidade 2: Manipulação de Organizações

### Registro de Organização

A funcionalidade de registro de organização permite que uma organização se registre no sistema. Os seguintes dados são necessários para registrar uma organização:

- Nome da organização
- Email da organização
- Senha da organização
- CEP da organização
- Número de telefone da organização
- Endereço da organização
- Cidade da organização

Após o registro, a organização obtém um ID único no sistema.

#### Rotas de Organização

- `POST /organizations

`: Rota para registrar uma nova organização. Os seguintes dados são enviados no corpo da solicitação: nome, email, senha, CEP, número de telefone, endereço e cidade da organização. O servidor valida os dados e cria uma nova organização no banco de dados. Se bem-sucedido, retorna os detalhes da organização, incluindo seu ID.

Exemplo de solicitação:
```http
POST /organizations
Content-Type: application/json

{
  "name": "Organização Teste",
  "email": "org@example.com",
  "password": "password123",
  "zip_code": "12345-678",
  "phone_number": "987654321",
  "address": "Rua Exemplo, 123",
  "city": "São Paulo"
}
```

### Listagem de Organizações

A funcionalidade de listagem de organizações permite que os usuários vejam a lista de todas as organizações registradas no sistema. Cada organização é representada por seu nome e ID.

#### Rotas de Organização

- `GET /organizations`: Rota para listar todas as organizações registradas no sistema. O servidor recupera todas as organizações do banco de dados e as retorna como resultado.

Exemplo de solicitação:
```http
GET /organizations
```

### Detalhes da Organização

A funcionalidade de detalhes da organização permite que os usuários vejam informações detalhadas sobre uma organização específica. As informações exibidas incluem o nome, email, CEP, número de telefone, endereço e cidade da organização.

#### Rotas de Organização

- `GET /organizations/{id}`: Rota para obter os detalhes de uma organização específica. O servidor recupera a organização com o ID fornecido do banco de dados e a retorna como resultado.

Exemplo de solicitação:
```http
GET /organizations/1
```

## Funcionalidade 3: Manipulação de Pets

### Registro de Pet

A funcionalidade de registro de pet permite que uma organização registre um novo pet no sistema. Os seguintes dados são necessários para registrar um pet:

- Nome do pet
- Descrição do pet
- Idade do pet
- Nível de independência do pet
- ID da organização responsável pelo pet
- Cidade do pet
- Habitat do pet

Após o registro, o pet obtém um ID único no sistema.

#### Rotas de Pet

- `POST /pets`: Rota para registrar um novo pet. Os seguintes dados são enviados no corpo da solicitação: nome, descrição, idade, nível de independência, ID da organização, cidade e habitat do pet. O servidor valida os dados e cria um novo pet no banco de dados. Se bem-sucedido, retorna os detalhes do pet, incluindo seu ID.

Exemplo de solicitação:
```http
POST /pets
Content-Type: application/json

{
  "name": "Bob",
  "description": "Um lindo cachorro",
  "age": "2 anos",
  "independence": "Moderada",
  "org_id": 1,
  "city": "São Paulo",
  "habitat": "Casa"
}
```

### Listagem de Pets

A funcionalidade de listagem de pets permite que os usuários vejam a lista de todos os pets registrados no sistema. Cada pet é representado por seu nome e ID.

#### Rotas de Pet

- `

GET /pets`: Rota para listar todos os pets registrados no sistema. O servidor recupera todos os pets do banco de dados e os retorna como resultado.

Exemplo de solicitação:
```http
GET /pets
```

### Detalhes do Pet

A funcionalidade de detalhes do pet permite que os usuários vejam informações detalhadas sobre um pet específico. As informações exibidas incluem o nome, descrição, idade, nível de independência, ID da organização, cidade e habitat do pet.

#### Rotas de Pet

- `GET /pets/{id}`: Rota para obter os detalhes de um pet específico. O servidor recupera o pet com o ID fornecido do banco de dados e o retorna como resultado.

Exemplo de solicitação:
```http
GET /pets/1
```

Essas são as principais funcionalidades do sistema, juntamente com as rotas correspondentes para cada uma delas. Utilizando essas rotas, os usuários podem realizar as operações de autenticação, manipulação de organizações e manipulação de pets de acordo com as necessidades do sistema.
