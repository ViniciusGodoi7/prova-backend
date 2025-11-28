const db = require("../datas/connection");

const cadastrarLanche = async (req, res) => {
    const { tipo_lanche, preco } = req.body;
    const novoLanche = await db.query("insert into lanche values (default, ?, ?)", [tipo_lanche, preco]);
    const lanche = {
        id: novoLanche[0].insertId,
        tipo_lanche: tipo_lanche
    }
    res.json(lanche).status(201).end();
}

const listarLanche = async (req, res) => {
    const lista = await db.query("select * from lanche;");
    res.json(lista[0]).end();
}

 const atualizarLanche = async (req, res) => {
    const { id, tipo_lanche, preco } = req.body;

    try {
        const update = await db.query("update lanche set tipo_lanche = ?, preco = ? where id = ?", [tipo_lanche, preco, id]);
   
        const info = { msg: ""};

        if (update[0].affectedRows === 1) {
            info.msg = "Atualizado com sucesso";
        } else if (update[0].affectedRows === 0) {
            info.msg = "Lanche não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const excluirLanche = async (req, res) => {
    const id = req.params.id;
    try {
        const remove = await db.query("delete from lanche where id = ?", [id]);
        console.log(remove);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        const err = { msg: "" };
        if (error.errno == 1451) {
            err.msg = "Lanche registrado";
        }
        res.status(500).json(err).end();
    }
}


const totalFaturado = async (req, res) => {
    const lista = await db.query("select sum(pedido.quantidade * lanche.preco) as 'Total faturado' from pedido inner join lanche on lanche.id = pedido.lanche_id;");
    res.json(lista[0]).end();
}


module.exports = {
    cadastrarLanche,
    listarLanche,
    atualizarLanche,
    excluirLanche,
    totalFaturado
}