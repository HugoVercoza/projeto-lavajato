const db = require('../config/db');

const Cliente = {

    buscarTodos: (callback) => {
        const sql = "SELECT * FROM cliente";

        db.query(sql, callback);
    },

    criar: (novoCliente, callback) => {
        const sql = "INSERT INTO cliente (nome, telefone) VALUES(?, ?)";

        db.query(sql, [novoCliente.nome, novoCliente.telefone], callback);
    },

    remover: (id, callback) => {
        const sql = "DELETE FROM cliente WHERE id_cli = ?";

        db.query(sql, [id], callback);
    },

    atualizar: (id, dados, callback) => {
        const sql = "UPDATE cliente SET nome = ?, telefone = ? WHERE id_cli = ?";

        db.query(sql, [dados.nome, dados.telefone, id], callback);
    }

};

module.exports = Cliente;