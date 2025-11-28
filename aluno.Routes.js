const express = require("express");
const Router = express.Router();

const alunoControllers = require("../controllers/aluno.Controllers");

Router.post("/alunos", alunoControllers.cadastrarAluno);
Router.get("/aluno", alunoControllers.listarAluno);
Router.put("/alunos", alunoControllers.atualizarAluno);
Router.delete("/alunos/:id", alunoControllers.excluirAluno);
Router.get("/aluno", alunoControllers.totalgastoporAluno);

module.exports = Router;
