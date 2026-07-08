## 1. Configuração e Dados Iniciais

- [x] 1.1 Inserir nó de dados `"medicamentos"` em `src/services/db.json` com exemplos iniciais válidos e vencidos.

## 2. Roteamento e Navegação

- [x] 2.1 Adicionar a rota `/medicamentos` vinculando ao componente `MedicinesStock` em `src/main.jsx`.
- [x] 2.2 Adicionar item no menu lateral `SideMenu` em `src/components/SideMenu/index.jsx` apontando para a nova rota, utilizando o ícone `FaPills` ou equivalente.

## 3. Tela de Listagem e Funcionalidades

- [x] 3.1 Criar o componente principal `MedicinesStock` (`src/components/MedicinesStock/index.jsx`) com a tabela de listagem puxando dados da API.
- [x] 3.2 Implementar a busca textual em tempo real (filtrando por nome, marca ou fabricante).
- [x] 3.3 Integrar o componente de paginação (`Pagination`) limitando a exibição em 5 medicamentos por página.
- [x] 3.4 Implementar a lógica de badges coloridos de validade (Vermelho = Vencido, Amarelo = Vencimento em até 30 dias, Verde = Válido).

## 4. Modal de Cadastro e Edição

- [ ] 4.1 Criar o modal do formulário `MedicineModal.jsx` (`src/components/MedicinesStock/MedicineModal.jsx`) utilizando o componente `Modal` genérico da aplicação.
- [ ] 4.2 Implementar campos de input no modal com validações de obrigatoriedade.
- [ ] 4.3 Implementar a ação de salvar: disparar POST para cadastrar ou PUT para editar o medicamento, integrando mensagens de Toastify.
- [ ] 4.4 Integrar o modal na tela de listagem para que abra ao clicar em "+ Cadastrar Novo" ou "Editar".

## 5. Ação de Exclusão

- [ ] 5.1 Adicionar a função de deletar disparando requisição DELETE para a API após exibir um alerta de confirmação.
