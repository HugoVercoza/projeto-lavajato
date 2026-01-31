const db = require('../config/db');

const Servico = {

    buscarTodos: (callback) => {
        const sql = "SELECT * FROM servico";

        db.query(sql, callback);
    }, //buscar dados com o select


    criar: (novoServico, callback) => {
        const sql = "INSERT INTO servico (nome, preco, tempo) VALUES(?, ?, ?)";

        db.query(sql, [novoServico.nome, novoServico.preco, novoServico.tempo], callback);
    }, //criar dados com insert into

    remover: (id, callback) => {
        const sql = "DELETE FROM servico WHERE id_ser = ?";

        db.query(sql, [id], callback);
    },

    atualizar: (id, dados, callback) =>{
        const sql = "UPDATE servico SET nome = ?, preco = ?, tempo = ? WHERE id_ser = ?";

        db.query(sql, [dados.nome, dados.preco, dados.tempo, id], callback);
    }
};

module.exports = Servico;