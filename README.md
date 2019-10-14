# Gataway de pagamentos feito em Node.js

Esse repositório tem como objetivo em ser um sistema de pagamento simplificado usando Node.js.

## Descrição

O sistema oferece os seguintes serviços:
- Criar e editar a conta do usuário recebedor
- Criar transações de ```Débito``` e ```Crédito a vista``` e processar os recebíveis para o recebedor
- Visualizar os recebíveis do usuário

## Tecnologias
- Node.js v10+
- Express
- Swagger tools
- Sequelize
- Sucrase
- Winston (Log)
- JWT
- PostgresSQL
- Jest
- SQLite
-

## Usando localmente
Primeiro instale as dependências:
```
yarn
```
Ou instale usando NPM:
```
npm install
```
### Banco de dados
O projeto foi construído usando o ```PostreSQL``` como banco de dados base da aplicação. É possível baixar no [site](https://www.postgresql.org/download/) ou também através de criação e execução de instâncias em [containers Docker](https://hub.docker.com/_/postgres).
Após a instalação, crie um banco de dados. Exemplo:
```
create database "psp"
```
### Defina as variáveis de ambiente
Copie o arquivo modelo:
```
cp .env.example .env
```
Windows:
```
copy .\.env.example .env
```
Segue um exemplo de configuração da variáveis de ambiente:
```
NODE_ENV=development
PORT=9000

# Auth

TOKEN_SECRET=yourtokensecret
TOKEN_EXPIRES_IN=1h

# Database

DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yoursecret
DB_DATABASE=psp
DB_PORT=5432
DB_MIN_POOL=1
DB_MAX_POOL=50
DB_IDLE=10000
DB_LOGGING=false
```
A expressão para o ```TOKEN_EXPIRES_IN``` pode ser acessado [aqui](https://github.com/zeit/ms)

### Criação das tabelas
Usando YARN
```
yarn sequelize db:migrate
```
Usando NPM
```
npm run sequelize db:migrate
```
### Executando
Usando YARN:
```
yarn start
```
Usando NPM:
```
npm start
```
### Acessando a documentação da API
O projeto foi escrito usando a documentação interativa do swagger. Para acessar, execute a aplicação ``` yarn start ```
e acesse pela url da aplicação. Exemplo:
```
localhost:9000/docs/
```
### Testando
Para executar os testes em ambiente UNIX, use:
```
yarn test
```
Em ambiente Windows, use:
```
yarn test:windows
```
### Usando os end-points que estão protegidos
Para utilizar os end-points que são protegidos, devem serem realizados através de autenticação do usuário na aplicação, onde a mesma irá gerar um token de autorização de acesso.
```
Exemplo de autenticação
```
![](https://github.com/anderfilth/payment-gateway-api/blob/master/tmp/1.png)
Em seguida, adicione o token no header das aplicações seguintes:
![](https://github.com/anderfilth/payment-gateway-api/blob/master/tmp/2.png)


## License

This project is under the MIT license. See the [LICENSE](https://github.com/anderfilth/payment-gateway-api/blob/master/LICENSE) for more information.

---

## Contribuidor

- Anderson R. Santos [Contato](https://www.linkedin.com/in/anderson-ribeiro-dos-santos-a53a1a4b/)
