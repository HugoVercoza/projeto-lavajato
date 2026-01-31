const db = require('../config/db');

const Veiculo = {

    buscarTodos: (callback) => {
        const sql = `
            SELECT veiculo.*, cliente.nome AS nome_dono 
            FROM veiculo 
            INNER JOIN cliente ON veiculo.id_cli = cliente.id_cli
        `;

        db.query(sql, callback);
    },

    buscarPorCliente: (id_cli, callback) => {
        const sql = "SELECT * FROM veiculo WHERE id_cli = ?";

        db.query(sql, [id_cli], callback);
    },

    criar: (novoVeiculo, callback) => {
        const sql = `
            INSERT INTO veiculo (placa, cor, modelo, marca, id_cli) VALUES(?, ?, ?, ?, ?) 
        `;
        
        db.query(sql, [
            novoVeiculo.placa,
            novoVeiculo.cor,
            novoVeiculo.modelo,
            novoVeiculo.marca,
            novoVeiculo.id_cli
        ], callback);
    },

    remover: (id, callback) => {
        const sql = "DELETE FROM veiculo WHERE id_vei = ?";

        db.query(sql, [id], callback);
    },

    atualizar: (id, dados, callback) => {
        const sql = "UPDATE veiculo SET placa = ?, cor = ?, modelo = ?, marca = ?, id_cli = ? WHERE id_vei = ?";

        db.query(sql, [
            dados.placa,
            dados.cor,
            dados.modelo,
            dados.marca,
            dados.id_cli,
            id
        ], callback);
    }

};

module.exports = Veiculo;