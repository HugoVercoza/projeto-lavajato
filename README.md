# 🧼 Sistema de Gestão para Lava-Jato (Backend API)

Este é o projeto de uma API REST desenvolvida para automatizar e gerenciar as operações de um lava-jato. A aplicação permite o controle total sobre clientes, veículos, serviços e o fluxo de agendamentos.

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução para o JavaScript no servidor.
* **Express**: Framework para criação das rotas e gerenciamento de requisições HTTP.
* **MySQL**: Banco de dados relacional para persistência dos dados.
* **MySQL2**: Driver de conexão otimizado para integração Node-MySQL.

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)**, garantindo uma separação clara de responsabilidades:
- **Models**: Gerenciam as queries SQL e a comunicação direta com o banco de dados.
- **Controllers**: Processam a lógica de negócio e as validações das requisições.
- **Routes (server.js)**: Definem os endpoints da API.



## 🛠️ Funcionalidades Principais

### 1. CRUDs Completos
Operações de Criação, Leitura, Atualização e Exclusão para as tabelas:
* **Clientes**: Gerenciamento de dados de contato.
* **Veículos**: Cadastro vinculado a proprietários (Relacionamento 1:N).
* **Serviços**: Tabela de preços e tempos estimados.
* **Agendamentos**: O coração da aplicação, vinculando cliente, veículo e serviço.

### 2. Consultas Avançadas (SQL Joins)
A API conta com rotas otimizadas que retornam dados detalhados para o front-end, trocando IDs por informações legíveis:
* **Listagem de Veículos por Cliente**: Busca todos os carros vinculados a um `id_cli`.
* **Agendamentos Detalhados**: Retorna o nome do cliente, modelo do veículo e nome do serviço em uma única consulta utilizando `INNER JOIN`.
* **Filtro por Data**: Busca de agendamentos por data e hora utilizando o operador `LIKE` para maior flexibilidade.



## 📋 Como Testar

1. Clone o repositório.
2. Certifique-se de ter o **MySQL** rodando e crie o schema conforme as tabelas (Clientes, Veiculos, Servicos, Agendamentos).
3. Instale as dependências:
   ```bash
   npm install
