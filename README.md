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

## 4. Configuração do Ambiente

1. Na raiz do projeto, crie um arquivo `.env` com base no `.env.example` e configure as variáveis de ambiente.
   Exemplo:

```
DATABASE_URL="postgresql://postgres@localhost:5432/githubrepolist"
```

## 5. Instalar as Dependências

Ainda na raiz do projeto, execute o comando abaixo para instalar todas as dependências do frontend e backend:

```
npm install
```

## 6. Aplicar Migrações do Banco

Após configurar o banco e o arquivo `.env`, rode o seguinte comando para criar as tabelas:

```
npx prisma migrate dev
```

## 7. Rodar o projeto

Execute o seguinte comando para rodar backend e frontend simultaneamente:

```
npm run dev
```

o backend será executado em `http://localhost:5000` e o frontend em `http://localhost:5173`.
