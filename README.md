# 🧼 Sistema de Gestão para Lava-Jato (Backend API)

Este é o projeto de uma API REST desenvolvida para automatizar e gerenciar as operações de um lava-jato. A aplicação permite o controle total sobre clientes, veículos, serviços e o fluxo de agendamentos, focando em integridade de dados e facilidade de consumo pelo Frontend.

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript no servidor.
* **Express**: Framework para gerenciamento de rotas e requisições HTTP.
* **MySQL**: Banco de dados relacional para persistência dos dados.
* **CORS**: Middleware para permitir a comunicação segura com o Frontend (React).

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)**, garantindo uma separação clara de responsabilidades:
- **Models**: Gerenciam as queries SQL e a comunicação direta com o banco de dados via `mysql2`.
- **Controllers**: Processam a lógica de negócio e as validações das requisições.
- **Routes (server.js)**: Definem os endpoints da API de forma organizada por métodos HTTP.



## 🔒 Segurança e Regras de Negócio

A API conta com camadas de validação para garantir a integridade dos dados:
- **Validação de ENUMs**: No backend, os campos `forma_pag` e `status_pag` são validados contra listas pré-definidas (`pix`, `dinheiro`, `cartao`, `pendente`, etc.), impedindo inserções inválidas via ferramentas externas (Bypass de Frontend).
- **Tratamento de Erros**: Respostas HTTP padronizadas (400 para erros de entrada, 404 para registros não encontrados e 500 para falhas no servidor).
- **Integridade Referencial**: Uso de Chaves Estrangeiras (FK) para garantir vínculos consistentes entre Clientes, Veículos e Serviços.

## 📡 Endpoints Principais (API)

### Agendamentos
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/agendamentos` | Lista agendamentos detalhados (JOIN com clientes e veículos). |
| **GET** | `/agendamentos/data/:data` | Filtra agendamentos por data utilizando `LIKE`. |
| **GET** | `/agendamentos/status/:status` | Filtra agendamentos por status de pagamento. |
| **POST** | `/agendamentos` | Cria um novo agendamento no sistema. |
| **PUT** | `/agendamentos/:id` | Atualiza dados e valida opções de pagamento/status. |
| **DELETE**| `/agendamentos/:id` | Remove um registro de agendamento. |

### Outras Entidades
- `GET /veiculos/clientes/:id_cli`: Busca veículos de um proprietário específico.
- `GET /servicos`, `POST /clientes`, `PUT /veiculos/:id`: CRUDs completos para todas as tabelas.



## 🛠️ Funcionalidades Principais

* **Consultas Avançadas (SQL Joins)**: A API simplifica o trabalho do Frontend ao retornar nomes de clientes, modelos de veículos e preços de serviços em uma única consulta, em vez de apenas IDs.
* **Flexibilidade de Busca**: Filtros dinâmicos que permitem buscar serviços por cliente, veículo ou data específica.

## 📋 Como Instalar e Testar

1. **Clone o repositório.**
2. **Configure o Banco de Dados**: Certifique-se de ter o MySQL rodando e execute o script SQL para criação das tabelas e relacionamentos.
3. **Instale as dependências**:
   ```bash
   npm install
