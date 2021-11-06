const express = require("express");
const app = express();
require('dotenv').config()

app.use(express.json());

const Conn = require("./model/conn/index"); //importando a conexao

Conn(); //executa a func de conexao


const estadosRouter = require("./routers/estados.routes");
app.use('/estados',estadosRouter);

const cidadesRouter = require("./routers/cidades.routes");
app.use('/cidades',cidadesRouter);


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});