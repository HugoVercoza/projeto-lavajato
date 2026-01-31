const ClienteModel = require('../models/ClienteModel');

exports.listarClientes = (req, res) => {
    ClienteModel.buscarTodos((err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar clientes"});
        }

        res.json(resultados);
    });
};

exports.adicionarClientes = (req, res) => {
    const novo = req.body;
    const {nome} = req.body;

    if (!nome) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    ClienteModel.criar(novo, (err, resultado) => {
        if (err) {
            return res.status(500).json({error: "Erro ao salvar no banco"})
        }

        res.status(201).json({message: "Cliente cadastrado", id: resultado.insertId});
    });
};

exports.removerClientes = (req, res) => {
    const {id} = req.params;

    ClienteModel.remover(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao excluir cliente"});
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado!" });
        }

        res.json({message: "Cliente removido"});
    })
};

exports.atualizarClientes = (req, res) => {
    const {id} = req.params;
    const {nome, telefone} = req.body;

    if (!id || !nome) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    const dados = {nome, telefone};

    ClienteModel.atualizar(id, dados, (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Erro ao atualizar cliente no banco"});
        }

        if (resultados.affectedRows == 0) {
            return res.status(404).json({error: "Cliente não encontrado no banco"});
        }

        res.json({message: "Cliente atualizado"});
    });
};