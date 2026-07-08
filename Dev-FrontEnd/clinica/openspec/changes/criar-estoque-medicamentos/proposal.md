## Why

A clínica necessita de um controle eficiente sobre seu estoque de medicamentos para evitar desperdícios decorrentes de vencimentos não identificados, garantir a disponibilidade de remédios essenciais para os tratamentos e facilitar a visualização rápida e gerenciamento desses itens pelos administradores e profissionais de saúde.

## What Changes

- **Banco de Dados**: Criação da coleção `"medicamentos"` no arquivo `src/services/db.json` com campos básicos de identificação (`id`, `nome`, `marca`, `fabricante`, `vencimento`).
- **Navegação**: Adição de um link de acesso no menu lateral `SideMenu` com ícone temático (`FaPills` ou similar) apontando para a nova rota `/medicamentos`.
- **Roteamento**: Registro da rota `/medicamentos` sob a estrutura protegida de `DashboardLayout` no arquivo `src/main.jsx`.
- **Listagem de Medicamentos**: Desenvolvimento de uma página dedicada exibindo os medicamentos cadastrados em formato de tabela responsiva, permitindo busca rápida (nome, marca ou fabricante) e paginação integrada (5 itens por página).
- **Cadastro e Edição (Formulário)**: Criação de um formulário interativo de cadastro e edição de medicamentos utilizando o componente de `Modal` existente na aplicação para assegurar agilidade nas operações.
- **Exclusão**: Funcionalidade de exclusão de medicamentos via API utilizando confirmação visual prévia para segurança dos dados.
- **Destaque Visual de Validade (UX)**: Implementação de um indicador de status de validade por cores (Vencido em vermelho, Próximo ao Vencimento em amarelo, Válido em verde).

## Capabilities

### New Capabilities
- `estoque-medicamentos`: Gerenciamento completo de estoque de medicamentos contendo listagem, cadastro, edição, exclusão e alertas de vencimento integrados ao ecossistema do painel da clínica.

### Modified Capabilities
*(Nenhuma capacidade existente foi modificada no nível de requisitos).*

## Impact

- **Rotas**: `src/main.jsx` (acréscimo da rota `/medicamentos`).
- **Navegação**: `src/components/SideMenu/index.jsx` (novo item de menu lateral).
- **Persistência**: `src/services/db.json` (adição do nó de dados `medicamentos`).
- **Interface**: Criação da nova pasta `src/components/MedicinesStock/` contendo os componentes da listagem e do formulário.
