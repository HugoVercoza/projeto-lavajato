const db = require('../config/db');

const Agendamento = {

    buscarTodos: (callback) =>{
        const sql = `
            SELECT agendamento.*, cliente.nome AS nome_cliente, veiculo.placa AS placa_carro, servico.nome AS nome_servico
            FROM agendamento
            INNER JOIN cliente ON agendamento.id_cli = cliente.id_cli
            INNER JOIN veiculo ON agendamento.id_vei = veiculo.id_vei
            INNER JOIN servico ON agendamento.id_ser = servico.id_ser
        `;

        db.query(sql, callback);
    },

    buscarPorData: (data, callback) => {
        const sql = `
            SELECT age.*, cli.nome AS nome_cliente, vei.placa AS placa_carro, ser.nome AS nome_servico
            FROM agendamento age
            INNER JOIN cliente cli ON age.id_cli = cli.id_cli
            INNER JOIN veiculo vei ON age.id_vei = vei.id_vei
            INNER JOIN servico ser ON age.id_ser = ser.id_ser
            WHERE age.data_hora LIKE ?
        `;
        const data_hora = `%${data}%`
        db.query(sql, [data_hora], callback);
    },

    criar: (novoAgendamento, callback) => {
        const sql = `
        INSERT INTO agendamento (data_hora, forma_pag, id_cli, id_ser, id_vei)
        VALUES(?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            novoAgendamento.data_hora,
            novoAgendamento.forma_pag,
            novoAgendamento.id_cli,
            novoAgendamento.id_ser,
            novoAgendamento.id_vei
        ], callback);
    },

    remover: (id, callback) => {
        const sql = "DELETE FROM agendamento WHERE id_age = ?";

        db.query(sql, [id], callback);
    },

    atualizar: (id, dados, callback) => {
        const sql = `
        UPDATE agendamento 
        SET data_hora = ?, forma_pag = ?, status_pag = ?, id_cli = ?, id_ser = ?, id_vei = ?
        WHERE id_age = ?
        `;

        db.query(sql, [
            dados.data_hora,
            dados.forma_pag,
            dados.status_pag,
            dados.id_cli,
            dados.id_ser,
            dados.id_vei,
            id
        ], callback);
    }

};

module.exports = Agendamento;

// agendamento por servico, age por cliente, age por carro, age por forma_pag