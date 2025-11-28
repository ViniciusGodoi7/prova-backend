const express = require('express');
const cors = require('cors');

const alunoRoutes = require("./src/routes/aluno.Routes");
const lancheRoutes = require("./src/routes/lanche.Routes");
const pedidoRoutes = require("./src/routes/pedido.Routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(alunoRoutes);
app.use(lancheRoutes);
app.use(pedidoRoutes);

app.listen(3000, () => {
           console.log("Servidor Online");
});