const db = require("../datas/connection");

const cadastrarAluno = async (req, res) => {
    const { nome, turma } = req.body;
    const novoAluno = await db.query("insert into aluno values (default, ?, ?)", [nome, turma]);
    const aluno = {
        id: novoAluno[0].insertId,
        nome: nome
    }
    res.json(aluno).status(201).end();
}

const listarAluno = async (req, res) => {
    const lista = await db.query("select * from aluno;");
    res.json(lista[0]).end();
}

const atualizarAluno = async (req, res) => {
    const { id, nome, turma } = req.body;

    try {
        const update = await db.query("update aluno set nome = ?, turma = ? where id = ?", [nome, turma, id]);
   
        const info = { msg: ""};

        if (update[0].affectedRows === 1) {
            info.msg = "Atualizado com sucesso";
        } else if (update[0].affectedRows === 0) {
            info.msg = "Usuario não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const excluirAluno = async (req, res) => {
    const id = req.params.id;
    try {
        const remove = await db.query("delete from aluno where id = ?", [id]);
        console.log(remove);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        const err = { msg: "" };
        if (error.errno == 1451) {
            err.msg = "Usuário registrado";
        }
        res.status(500).json(err).end();
    }
}

const totalgastoporAluno = async (req, res) => {
    const lista = await db.query("Select aluno.id as 'ID do aluno', aluno.nome as 'Aluno', aluno.turma as 'Turma', sum(pedido.quantidade * lanche.preco) as 'Total gasto' from aluno inner join pedido on aluno.id = pedido.aluno_id inner join lanche on lanche.id = pedido.lanche_id group by aluno.id, aluno.nome, aluno.turma order by aluno.id;");
    res.json(lista[0]).end();
}

module.exports = {
    cadastrarAluno,
    listarAluno,
    atualizarAluno,
    excluirAluno,
    totalgastoporAluno
}
