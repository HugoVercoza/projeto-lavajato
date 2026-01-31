const ServicoModel = require("../models/ServicoModel");

exports.listarServicos = (req, res) => {
    ServicoModel.buscarTodos((err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar serviços"});
        }

        res.json(resultados);
    });
};

exports.adicionarServicos = (req, res) => {
    const novo = req.body;
    const {nome, preco} = req.body;

    if (!nome || !preco || !tempo) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    ServicoModel.criar(novo, (err, resultado) => {
        if (err) {
            return res.status(500).json({error: "Erro ao salvar no banco"});
        }

        res.status(201).json({message: "Serviço cadastrado!", id: resultado.insertId});
    });
};

exports.removerServicos = (req, res) => {
    const {id} = req.params;

    ServicoModel.remover(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao excluir serviço"});
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado!" });
        }

        res.json({message: "Serviço removido"});
    });
};

exports.atualizarServicos = (req, res) => {
    const {id} = req.params;
    const {nome, preco, tempo} = req.body;

    if (!id || !nome || !preco || !tempo) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    const dados = {nome, preco, tempo};

    ServicoModel.atualizar(id, dados, (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Erro ao atualizar serviço no banco"});
        }

        if (resultados.affectedRows == 0) {
            return res.status(404).json({error: "Serviço não encontrado no banco"});
        }

        res.json({message: "Serviço atualizado"});
    });
};