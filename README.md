# 

# HubPersonal - Backend

## Descrição

O **HubPersonal** é um sistema para gerenciar o registro de usuários e autenticação (login e registro), utilizado para conectar alunos e personal trainers. O sistema fornece funcionalidades de login, registro e geração de tokens JWT para autenticação de usuários, usando o Sequelize com PostgreSQL como banco de dados.

Este repositório contém o backend do sistema, que foi desenvolvido utilizando **Node.js**, **TypeScript**, **Sequelize** e **PostgreSQL**. Ele foi projetado para ser escalável e fácil de testar com mocks.

---

## Funcionalidades

- **Registro de usuário**: Permite registrar novos usuários, com informações como nome, e-mail, senha (devidamente hasheada), telefone e foto de perfil.
- **Login de usuário**: Permite o login de usuários registrados, gerando um **token JWT** para autenticação.
- **Autenticação via JWT**: O sistema utiliza tokens JWT para autenticação de usuários em rotas protegidas.
- **Controle de permissões**: O sistema diferencia usuários do tipo **personal** e **student** e pode ser extendido para outros papéis.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma para rodar o código JavaScript no servidor.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript.
- **Sequelize**: ORM para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados dos usuários.
- **JWT (JSON Web Token)**: Sistema de autenticação utilizado para garantir que o usuário esteja autenticado.
- **Jest**: Framework de testes utilizado para testar as funcionalidades do sistema.
- **Supertest**: Biblioteca para testes de integração, que permite fazer requisições HTTP e testar as respostas.
- **Bcryptjs**: Biblioteca para hashing de senhas e comparação de senhas seguras.

---

## Como Rodar o Projeto

### Pré-requisitos

1. **Node.js** e **npm** instalados.
    - Instale o Node.js a partir de [aqui](https://nodejs.org/).
2. **PostgreSQL** instalado e rodando localmente ou configurado em um servidor.
3. **Variáveis de Ambiente**:
    - Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:
        
        ```
        DB_HOST=localhost
        DB_PORT=5432
        DB_USERNAME=seu_usuario
        DB_PASSWORD=sua_senha
        DB_NAME=hubpersonal
        PORT=5000
        JWT_SECRET=sua_chave_secreta
        JWT_EXPIRES_IN=1h
        
        ```
        

### Passo a Passo

1. **Clonar o Repositório**:
    
    Clone o repositório para a sua máquina local:
    
    ```bash
    git clone <https://github.com/seu_usuario/hubpersonal.git>
    cd hubpersonal
    ```
    
2. **Instalar as dependências**:
    
    Instale as dependências do projeto com o npm:
    
    ```bash
    npm install
    ```
    
3. **Rodar o Banco de Dados (PostgreSQL)**:
    
    Certifique-se de que o PostgreSQL está rodando na sua máquina. Se for necessário, crie o banco de dados:
    
    ```sql
    CREATE DATABASE hubpersonal;
    ```
    
4. **Rodar as Migrações**:
    
    O projeto utiliza o Sequelize para gerenciar o banco de dados. Para criar as tabelas, execute as migrações:
    
    ```bash
    npx sequelize-cli db:migrate
    ```
    
5. **Rodar o Projeto**:
    
    Agora, para rodar o servidor em ambiente de desenvolvimento, utilize o seguinte comando:
    
    ```bash
    npm run dev
    ```
    
    O servidor estará rodando na porta configurada (por padrão `5000`).
    

---

## Estrutura do Projeto

Abaixo está a estrutura de pastas e arquivos do projeto:

```
bash
Copiar
├── .env.sample               # Exemplo de arquivo .env
├── .gitignore                # Arquivos e pastas a serem ignorados no Git
├── package.json              # Dependências e scripts do projeto
├── src
│   ├── business              # Contém a lógica de negócios
│   │   ├── AuthBusiness.ts   # Lógica de registro e login
│   │   ├── UserBusiness.ts   # Lógica do gerenciamento de usuários
│   ├── controllers           # Controladores de requisições HTTP
│   │   ├── AuthController.ts # Controlador de autenticação (login e registro)
│   ├── database              # Configuração do Sequelize (conexão com o banco)
│   ├── models                # Definição dos modelos do banco de dados (User, etc.)
│   ├── routes                # Definição das rotas da API
│   ├── services              # Comunicação com banco de dados
│   ├── utils                 # Funções utilitárias (como HashService e JwtService)
│   ├── index.ts              # Ponto de entrada da aplicação
├── tsconfig.json             # Configuração do TypeScript
├── jest.config.js            # Configuração do Jest para testes
├── README.md                 # Este arquivo

```

### Explicação das Pastas

- **`business/`**: Contém a lógica de negócios (como autenticação, criação de usuários).
- **`controllers/`**: Controladores responsáveis por lidar com as requisições HTTP.
- **`database/`**: Contém a configuração e inicialização do Sequelize, com a conexão com o banco de dados.
- **`models/`**: Define os modelos do banco de dados com Sequelize (como `User`).
- **`routes/`**: Define as rotas da API (por exemplo, `/api/auth/register`).
- **`services/`**: Contém os serviços para a comunicação com o banco de dados.
- **`utils/`**: Funções utilitárias, como o serviço de hash de senha (`HashService`) e JWT (`JwtService`).

---

## Testes

O sistema foi desenvolvido com testes unitários e de integração utilizando **Jest**.

### Rodando os Testes

Para rodar os testes, use o seguinte comando:

```bash
npm run tes
```

Os testes irão garantir que as funcionalidades de registro, login, e autenticação estão funcionando corretamente.

---

## Dicas e Boas Práticas

- **Boas práticas de segurança**:
    - Sempre utilize **senhas hasheadas**. O sistema usa o `bcryptjs` para realizar o hashing de senhas antes de armazená-las no banco de dados.
    - **Token JWT**: O JWT é utilizado para garantir que os usuários estejam autenticados. Certifique-se de definir um tempo de expiração adequado para os tokens e mantê-los seguros.
- **Desenvolvimento**:
    - Para rodar o servidor em modo de desenvolvimento com recarga automática, use:
        
        ```bash
        npm run dev
        ```
        
    - O servidor será reiniciado automaticamente sempre que você fizer alterações nos arquivos do código.
- **Uso do PostgreSQL**:
    - Certifique-se de que o PostgreSQL está configurado corretamente e que você tenha um banco de dados configurado para o ambiente de desenvolvimento.

---

## Licença

Este projeto está licenciado sob a [MIT License](https://www.notion.so/LICENSE).
