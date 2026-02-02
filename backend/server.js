const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const ServicoController = require('./controllers/ServicoController');
const ClienteController = require('./controllers/ClienteController');
const VeiculoController = require('./controllers/VeiculoController');
const AgendamentoController = require('./controllers/AgendamentoController');

app.get('/servicos', ServicoController.listarServicos);
app.get('/clientes', ClienteController.listarClientes);
app.get('/veiculos', VeiculoController.listarVeiculos);
app.get('/agendamentos', AgendamentoController.listarAgendamentos);

app.get('/veiculos/clientes/:id_cli', VeiculoController.listarVeiculosPorCliente);
app.get('/agendamentos/data/:data', AgendamentoController.listarAgendamentosPorData);
app.get('/agendamentos/servicos/:id_ser', AgendamentoController.listarAgendamentoPorServico);
app.get('/agendamentos/clientes/:id_cli', AgendamentoController.listarAgendamentoPorCliente);
app.get('/agendamentos/veiculos/:id_vei', AgendamentoController.listarAgendamentoPorVeiculo);
app.get('/agendamentos/formas/:forma_pag', AgendamentoController.listarAgendamentoPorFormaPag);
app.get('/agendamentos/status/:status_pag', AgendamentoController.listarAgendamentoPorStatusPag);

app.post('/servicos', ServicoController.adicionarServicos);
app.post('/clientes', ClienteController.adicionarClientes);
app.post('/veiculos', VeiculoController.adicionarVeiculos);
app.post('/agendamentos', AgendamentoController.adicionarAgendamentos);

app.delete('/servicos/:id', ServicoController.removerServicos);
app.delete('/clientes/:id', ClienteController.removerClientes);
app.delete('/veiculos/:id', VeiculoController.removerVeiculos);
app.delete('/agendamentos/:id', AgendamentoController.removerAgendamentos);

app.put('/servicos/:id', ServicoController.atualizarServicos);
app.put('/clientes/:id', ClienteController.atualizarClientes);
app.put('/veiculos/:id', VeiculoController.atualizarVeiculos);
app.put('/agendamentos/:id', AgendamentoController.atualizarAgendamentos);

app.listen(3001, () => {
    console.log("Servidor ativo em: http://localhost:3001");
});