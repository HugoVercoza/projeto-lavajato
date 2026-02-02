const db = require('../config/db');

const basequery = `
            SELECT age.*,
            cli.nome AS nome_cliente, cli.telefone AS tel_cliente,
            vei.placa AS placa_vei, vei.cor AS cor_vei, vei.modelo AS modelo_vei, vei.marca AS marca_vei,
            ser.nome AS nome_servico, ser.preco AS preco_servico, ser.tempo AS tempo_servico
            FROM agendamento age
            INNER JOIN cliente cli ON age.id_cli = cli.id_cli
            INNER JOIN veiculo vei ON age.id_vei = vei.id_vei
            INNER JOIN servico ser ON age.id_ser = ser.id_ser
        `;

const Agendamento = {

    buscarTodos: (callback) =>{
        db.query(basequery, callback);
    },

    buscarPorData: (data, callback) => {
        const sql = `${basequery} WHERE age.data_hora LIKE ?`;
        const data_hora = `%${data}%`
        db.query(sql, [data_hora], callback);
    },

    buscarPorServico: (id_ser, callback) => {
        const sql = `${basequery} WHERE age.id_ser = ?`;
        db.query(sql, [id_ser], callback);
    },

    buscarPorCliente: (id_cli, callback) => {
        const sql = `${basequery} WHERE age.id_cli = ?`;
        db.query(sql, [id_cli], callback);
    },

    buscarPorVeiculo: (id_vei, callback) => {
        const sql = `${basequery} WHERE age.id_vei = ?`;
        db.query(sql, [id_vei], callback);
    },

    buscarPorFormaPag: (forma, callback) => {
        const sql = `${basequery} WHERE age.forma_pag = ?`;
        db.query(sql, [forma], callback);
    },

    buscarPorStatusPag: (status, callback) => {
        const sql = `${basequery} WHERE age.status_pag = ?`;
        db.query(sql, [status], callback);
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