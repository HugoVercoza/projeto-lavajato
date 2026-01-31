const AgendamentoModel = require('../models/AgendamentoModel');

exports.listarAgendametos = (req, res) => {
    AgendamentoModel.buscarTodos((err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"});
        }

        res.json(resultados);
    });
};

exports.listarAgendamentosPorData = (req, res) => {
    const {data} = req.params;

    AgendamentoModel.buscarPorData(data, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"})
        }
        if (resultados.length == 0) {
            return res.status(404).json({message: "Não possuem agendamentos nessa data"});
        }
        res.json(resultados);
    });
};

exports.adicionarAgendamentos = (req, res) => {
    const novo = req.body;
    const {data_hora, id_cli, id_vei, id_ser} = req.body;

    if (!data_hora || !id_cli || !id_vei || !id_ser) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    AgendamentoModel.criar(novo, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao salvar no banco"});
        }

        res.status(201).json({message: "Agendamento cadastrado", id: resultados.insertId});
    });
};

exports.removerAgendamentos = (req, res) => {
    const {id} = req.params;

    AgendamentoModel.remover(id, (err, resultados) => {
        if (err) {
            res.status(500).json({error: "Erro ao excluir agendamento"});
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado!" });
        }

        res.json({message: "Agendamento removido"});
    });
};

exports.atualizarAgendamentos = (req, res) => {
    const {data_hora, forma_pag, status_pag, id_cli, id_ser, id_vei} = req.body;
    const {id} = req.params;
    

    if (!id || !data_hora || !id_cli || !id_ser || !id_vei) {
        return res.status(400).json({error: "Dados incompletos! Verifique e tente novamente"});
    }

    const dados = {data_hora, forma_pag, status_pag, id_cli, id_ser, id_vei}
    
    AgendamentoModel.atualizar(id, dados, (err, resultados) =>{
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Erro ao atualizar agendamento no banco"});
        }

        if (resultados.affectedRows == 0) {
            return res.status(404).json({error: "Agendamento não encontrado para atualização"})
        }

        res.json({message: "Dados atualizados"});
    });
};