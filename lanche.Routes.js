const express = require("express");
const router = express.Router();
const c = require("../controllers/lanche.Controllers");

router.get("/", c.listarLanche);
router.post("/", c.criarLanche);  
router.put("/:id", c.atualizarLanche);  
router.delete("/:id", c.excluirLanche);  
router.get("/relatorio/total-pedidos", c.totalPedidosPorProduto);

module.exports = router;