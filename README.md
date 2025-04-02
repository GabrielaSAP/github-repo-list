Este projeto está licenciado sob a Creative Commons Attribution-NonCommercial-ShareAlike 4.0.  
Isso significa que ele **não pode ser usado comercialmente sem permissão** e qualquer modificação deve ser compartilhada sob a mesma licença.  
[Leia mais sobre a licença aqui](https://creativecommons.org/licenses/by-nc-sa/4.0/).

# Rodando o Projeto

## 1. Dependências Necessárias

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- Node.js (versão recomendada: 18+)
- PostgreSQL (para o banco de dados)
- Git (para clonar o repositório)

## 2. Clonando o Repositório

```
git clone https://github.com/GabrielaSAP/github-repo-list.git
cd github-repo-list
```

## 3. Configuração do Banco de Dados

1. Certifique-se de que o PostgreSQL está rodando na sua máquina.
2. Acesse o PostgreSQL como superusuário:

```
psql -U postgres
```

3. Crie o banco de dados:

```
CREATE DATABASE githubrepolist;
```

4. Conceda permissões ao usuário do projeto (se necessário):

```
GRANT ALL PRIVILEGES ON DATABASE githubrepolist TO postgres;
```

5. Saia do PostgreSQL com `\q`.

## 4. Configuração dos Ambientes

1. Na raiz da pasta `backend`, crie um arquivo `.env` com base no `.env.example` e configure as variáveis de ambiente.
   Exemplo:

```
DATABASE_URL="postgresql://postgres@localhost:5432/githubrepolist"
```
Faça o mesmo com o `.env.example` da pasta `frontend`.

## 5. Instalar as Dependências

Na raiz do projeto, execute o comando abaixo para instalar todas as dependências do frontend e backend:

```
npm install
```

## 6. Aplicar Migrações do Banco

Após configurar o banco e o arquivo `.env`, rode o seguinte comando na raiz da pasta `backend` para criar as tabelas:

```
npx prisma migrate dev
```

## 7. Rodar o Projeto

Execute o seguinte comando na raiz do projeto para rodar backend e frontend simultaneamente:

```
npm run dev
```
O backend será executado em `http://localhost:5000` e o frontend em `http://localhost:5173`.

# Descrição do Projeto
Este projeto implementa a autenticação via GitHub utilizando Node.js e Express. O backend gerencia a autenticação OAuth2, gera tokens JWT e armazena os cookies para sessões autenticadas.

## Estrutura do Código
A organização do projeto segue a separação de responsabilidades, utilizando **Controller-Service-Model**:
```
📂 src
├── 📂 config → Configurações globais, como URLs do GitHub
├── 📂 controllers → Lógica das requisições HTTP
├── 📂 middlewares → Middlewares de autenticação e segurança
├── 📂 routes → Definição das rotas da API
├── 📂 services → Lógica de comunicação com APIs externas
├── 📂 utils → Funções auxiliares, como geração e verificação de JWT
├── 📄 index.ts → Configuração e inicialização do servidor Express
```
## O que foi feito
- Implementação do fluxo de autenticação via GitHub OAuth
- Geração de tokens JWT para autenticação de usuários
- Armazenamento do JWT via cookies HTTP-only
- Testes manuais utilizando curl para validar a autenticação
- Configuração de CORS para permitir requisições do frontend

## Como testar
1. Inicie o projeto pela raiz:
```
npm run dev  # Ou `npm run start`
```
2. No navegador, acesse:
```
http://localhost:5000/auth/github
```
3. Faça login no GitHub e observe o redirecionamento para:
```
http://localhost:5173/auth/github/callback
```
4. Verifique se o token foi salvo via cookies ou faça um teste manual:
```
curl -X GET http://localhost:5000/auth/user -b "jwt=SEU_TOKEN"

// para o teste manual, use:
curl -i -X GET http://localhost:5000/auth/github/callback?code=SEU_CODE_NA_URL_DO_FRONT -c cookies.txt
```
Dando certo, a resposta do GET será um 200 OK
