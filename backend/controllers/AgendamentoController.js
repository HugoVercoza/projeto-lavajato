const AgendamentoModel = require('../models/AgendamentoModel');

    const formaValida = ['dinheiro', 'pix', 'credito', 'debito'];
    const statusValido = ['pendente', 'pago', 'cancelado']; // duas validações para atualizar o agendamento

    exports.listarAgendamentos = (req, res) => {
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

exports.listarAgendamentoPorServico = (req, res) => {
    const {id_ser} = req.params;
    AgendamentoModel.buscarPorServico(id_ser, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"});
        }
        if (resultados.length == 0) {
            return res.status(404).json({message: "Não possuem agendamentos para esse serviço"});
        }

        res.json(resultados);
    });
};

exports.listarAgendamentoPorCliente = (req, res) => {
    const {id_cli} = req.params;
    AgendamentoModel.buscarPorCliente(id_cli, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"});
        }
        if (resultados.length == 0) {
            return res.status(404).json({message: "Não possuem agendamentos para esse cliente"});
        }

        res.json(resultados);
    });
};

exports.listarAgendamentoPorVeiculo = (req, res) => {
    const {id_vei} = req.params;
    AgendamentoModel.buscarPorVeiculo(id_vei, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"});
        }
        if (resultados.length == 0) {
            return res.status(404).json({message: "Não possuem agendamentos para esse veiculo"});
        }

        res.json(resultados);
    });
};

exports.listarAgendamentoPorFormaPag = (req, res) => {
    const {forma_pag} = req.params;
    AgendamentoModel.buscarPorFormaPag(forma_pag, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"});
        }
        if (resultados.length == 0) {
            return res.status(404).json({message: "Não possuem agendamentos para essa forma de pagamento"});
        }

        res.json(resultados);
    });
};

exports.listarAgendamentoPorStatusPag = (req, res) => {
    const {status_pag} = req.params;
    AgendamentoModel.buscarPorStatusPag(status_pag, (err, resultados) => {
        if (err) {
            return res.status(500).json({error: "Erro ao buscar agendamentos"});
        }
        if (resultados.length == 0) {
            return res.status(404).json({message: "Não possuem agendamentos com esse status"});
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

    if (forma_pag && !formaValida.includes(forma_pag)) {
        return res.status(400).json({message: "Forma de pagamento inválida"});
    }
    if (status_pag && !statusValido.includes(status_pag)){
        return res.status(400).json({message: "Status inválido"});
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