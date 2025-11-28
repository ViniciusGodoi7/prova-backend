const db = require("../datas/connection");

const cadastrarPedido = async (req, res) => {
    const { aluno_id, lanche_id, quantidade, obeservacao } = req.body;
    const novoPedido = await db.query("insert into pedido values (default, ?, ?, ?, ?)", [aluno_id, lanche_id, quantidade, obeservacao]);
    const pedido = {
        id: novoPedido[0].insertId,
        lanche_id: lanche_id,
        quantidade: quantidade
    }
    res.json(pedido).status(201).end();
}

const listarPedido = async (req, res) => {
    const lista = await db.query("select * from pedido;");
    res.json(lista[0]).end();
}

const atualizarPedido = async (req, res) => {
const { id, aluno_id, lanche_id, quantidade, obeservacao } = req.body;

    try {
        const update = await db.query("update pedido set aluno_id = ?, lanche_id = ?, quantidade = ?, observacao = ? where id = ?", [aluno_id, lanche_id, quantidade, obeservacao, id]);
   
        const info = { msg: ""};

        if (update[0].affectedRows === 1) {
            info.msg = "Atualizado com sucesso";
        } else if (update[0].affectedRows === 0) {
            info.msg = "Pedido não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const excluirPedido = async (req, res) => {
    const id = req.params.id;
    try {
        const remove = await db.query("delete from pedido where id = ?", [id]);
        console.log(remove);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        const err = { msg: "" };
        if (error.errno == 1451) {
            err.msg = "Usuário pedido registrado";
        }
        res.status(500).json(err).end();
    }
}

const TotalPedidosPorProdutos = async (req, res) => {
    const lista = await db.query("Select lanche.tipo_lanche as 'lanche', count(pedido.id) as 'Total de pedido' from lanche inner join pedido on lanche.id = pedido.lanche_id group by lanche.tipo_lanche;");
    res.json(lista[0]).end();
}

module.exports = {
    cadastrarPedido,
    listarPedido,
    atualizarPedido,
    excluirPedido,
    TotalPedidosPorProdutos
}