# Projeto Frontend - Cadastro de Pessoas com ViaCEP e Autenticação JWT

Este é o backend do mini projeto de cadastro de pessoas com autenticação JWT e busca de CEP utilizando a API do ViaCEP. O backend utiliza um padrão Proxy para armazenar resultados de CEP em cache para evitar consultas repetidas à API externa.

## Funcionalidades

- Autenticação de usuários com JWT.
- CRUD de pessoas (nome, idade, sexo e endereço).
- Busca de endereço por CEP utilizando a API do ViaCEP.
- Armazenamento de consultas de CEP em cache (MySQL).
- Implementação do padrão Proxy para otimização da busca de CEP.

## Tecnologias Utilizadas

- **Node.js** e **Express** para o servidor.
- **MySQL** como banco de dados.
- **JWT** (JSON Web Token) para autenticação.
- **Axios** para integração com a API do ViaCEP.
- **bcrypt** para hash de senhas.
- **dotenv** para variáveis de ambiente.

## Requisitos

- **Node.js** instalado.
- **MySQL** configurado e rodando.
- Backend configurado com as credenciais do banco de dados MySQL no arquivo `.env`.

## Instalação e Configuração

1. Clone este repositório:
   ```bash
   git clone https://github.com/JoaoEnrique/crud-node-express.git
2. Configure o Banco e a chave gerada:
   ```bash
    PORT=5000

    DB_DATABASE=database_name
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_DIALECT="mysql"
    TOKEN_SECRET=your-key  #Deve ser o mesmo do frontend