const express = require("express");
const Router = express.Router();

const pedidoControllers = require("../controllers/pedido.Controllers");

Router.post("/pedidos", pedidoControllers.cadastrarPedido);
Router.get("/pedido", pedidoControllers.listarPedido);
Router.put("/pedidos", pedidoControllers.atualizarPedido);
Router.delete("/pedidos/:id", pedidoControllers.excluirPedido);
Router.get("/pedido", pedidoControllers.TotalPedidosPorProdutos);

module.exports = Router;