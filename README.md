# Meu Livrinho - API

## Descrição
Este projeto constitui a camada de backend e integração de dados da plataforma Meu Livrinho. A API é responsável por gerenciar a comunicação entre o banco de dados relacional e a interface do usuário, garantindo a entrega segura e eficiente do acervo digital.

## Intuito e Finalidade
O sistema foi desenvolvido como uma solução de impacto social e educacional, criada especificamente para facilitar o acesso de crianças à leitura digital gratuita. O objetivo é centralizar obras literárias infantis de domínio público ou autorizadas, servindo como um repositório organizado para o projeto voluntário Meu Livrinho.

## Funcionalidades
* Gerenciamento e listagem do acervo de livros.
* Integração com serviço de banco de dados em nuvem.
* Fornecimento de metadados das obras (título, autor, links de acesso e capas).
* Sistema de busca e paginação para otimização de tráfego.

## Stack Tecnológica
* Ambiente de Execução: Node.js
* Framework: Express
* Banco de Dados: PostgreSQL (via Supabase)
* Segurança: Row Level Security (RLS) e CORS Restrito

## Arquitetura do Projeto
A aplicação segue uma estrutura modular para facilitar a manutenção e o trabalho em equipe:
* `src/server.js`: Configurações de infraestrutura e middlewares.
* `src/routes/`: Definição das rotas e métodos HTTP.
* `src/controllers/`: Processamento das requisições e respostas.
* `src/services/`: Comunicação direta com a camada de dados (Supabase).
* `src/config/`: Configuração de clientes e variáveis de ambiente.

## Endpoints
### Públicos
* `GET /livros`: Listagem paginada (20 itens) com filtros opcionais via query string (`page`, `search`).
* `GET /livros/:slug`: Detalhes de uma obra específica através do slug amigável.

### Administrativos (Acesso Restrito)
* `POST /livros`: Cadastro de novas obras.
* `PUT /livros/:id`: Atualização de registros existentes.
* `DELETE /livros/:id`: Remoção de registros do acervo.