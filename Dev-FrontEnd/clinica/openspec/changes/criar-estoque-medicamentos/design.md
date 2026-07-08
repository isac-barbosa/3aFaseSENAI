## Context

O projeto atual da clínica é uma Single Page Application construída com Vite, React, Tailwind CSS v4, React Router v7, Axios e Toastify. Atualmente, possui recursos de gerenciamento de pacientes, prontuários, consultas e exames que persistem dados em um servidor local simulado (`json-server`) em `src/services/db.json`. 

Este documento descreve a abordagem técnica de implementação do módulo de Estoque de Medicamentos (cadastro, listagem, edição e exclusão) integrado a esse ecossistema.

## Goals / Non-Goals

**Goals:**
- Adicionar suporte a dados de medicamentos no banco local (`db.json`).
- Criar a interface de listagem de medicamentos na rota `/medicamentos` integrada ao painel administrativo.
- Implementar formulários reativos de inclusão e edição dentro de um modal.
- Criar alertas visuais claros para datas de vencimento de medicamentos próximas ou expiradas.
- Integrar chamadas API seguras com validação no frontend e mensagens toast de status.

**Non-Goals:**
- Implementar movimentações detalhadas de estoque (entradas/saídas unitárias ou receitas vinculadas).
- Rastreamento avançado de lotes e fabricantes externos.
- Integração com estoque físico externo ou fornecedores terceiros.

## Decisions

### 1. Utilização de Formulário Unificado em Modal (Cadastro e Edição)
- **Decisão**: Utilizar o componente genérico de `Modal` existente em `src/components/Modal` para encapsular o formulário de dados de medicamentos na mesma página de listagem.
- **Racional**: Evita recarregamentos de página desnecessários ou a complexidade de gerenciar novas rotas aninhadas no React Router. Melhora a agilidade e fluidez do usuário nas tarefas de manutenção de registros rápidos.
- **Alternativa Considerada**: Criar rotas separadas (`/medicamentos/cadastrar` e `/medicamentos/editar/:id`). Rejeitado devido ao tempo de carregamento e distanciamento do fluxo visual principal da listagem.

### 2. Armazenamento e Exibição de Datas de Vencimento
- **Decisão**: Armazenar datas no formato ISO `YYYY-MM-DD` no banco de dados, mas exibi-las formatadas em `DD/MM/YYYY` na tabela.
- **Racional**: O componente nativo de input de data do HTML (`<input type="date">`) trabalha nativamente com o formato `YYYY-MM-DD`. Guardar essa estrutura crua simplifica as associações de estado no React. A comparação lógica de datas para os alertas de validade também é mais direta usando objetos `Date` padrão do JavaScript.
- **Alternativa Considerada**: Converter para `DD/MM/YYYY` antes de enviar ao JSON Server. Rejeitado porque exige analisadores de string extras em cada alteração de input ou submissão.

### 3. Navegação e Ícones Consistentes
- **Decisão**: Importar o ícone `FaPills` do pacote `react-icons/fa` no menu lateral para representar a seção de medicamentos.
- **Racional**: Harmoniza perfeitamente com os ícones já utilizados como `FaUserPlus` e `FaListAlt` nas demais seções.

## Risks / Trade-offs

- **[Risco] Inserção de Medicamento já Cadastrado (Duplicado)**
  - *Mitigação*: Validar em tempo de cadastro na listagem local de medicamentos se o nome + marca combinam exatamente com algum registro ativo, exibindo um toast de aviso ao usuário antes de salvar.
- **[Risco] Exclusão Acidental**
  - *Mitigação*: Implementar confirmação nativa (`window.confirm`) antes de disparar o comando de exclusão `axios.delete(...)`.
