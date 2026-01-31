const VeiculoModel = require('../models/VeiculoModel');

exports.listarVeiculos = (req, res) => {
    VeiculoModel.buscarTodos((err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar veiculos"});
        }

        res.json(resultados);
    });
};

exports.listarVeiculosPorCliente = (req, res) => {
    const {id_cli} = req.params;

    VeiculoModel.buscarPorCliente(id_cli, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar veiculos"});
        }

        if (resultados.length == 0) {
            return res.status(404).json({message: "Nenhum veiculo encontrado para esse cliente"});
        }

        res.json(resultados);
    });
};

exports.adicionarVeiculos = (req, res) => {
    const novo = req.body;
    const {placa, id_cli} = req.body;

    if (!placa || !id_cli) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    VeiculoModel.criar(novo, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao salvar no banco"});
        }

        res.status(201).json({message: "Veiculo cadastrado", id: resultados.insertId});
    });
};

exports.removerVeiculos = (req, res) => {
    const {id} = req.params;

    VeiculoModel.remover(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao excluir veiculo"});
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado!" });
        }

        res.json({message: "Veiculo removido"});
    });
};

exports.atualizarVeiculos = (req, res) => {
    const {id} = req.params;
    const {placa, cor, modelo, marca, id_cli} = req.body;

    if (!id || !placa || !cor || !modelo || !marca || !id_cli) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    const dados = {placa, cor, modelo, marca, id_cli};

    VeiculoModel.atualizar(id, dados, (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Erro ao atualizar veiculo no banco"});
        }

        if (resultados.affectedRows == 0) {
            return res.status(404).json({error: "Veiculo não encontrado no banco"});
        }

        res.json({message: "Veiculo atualizado"});
    });
};