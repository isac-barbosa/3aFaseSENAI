## ADDED Requirements

### Requirement: Listagem de Medicamentos
O sistema deve apresentar uma listagem de todos os medicamentos cadastrados obtidos a partir do backend.
- O sistema DEVE exibir os campos: Nome, Marca, Fabricante, Vencimento.
- A data de vencimento DEVE ser formatada no padrão brasileiro `DD/MM/YYYY`.
- O sistema DEVE permitir a busca por nome, marca ou fabricante, filtrando a lista em tempo real.
- O sistema DEVE paginar a lista exibindo no máximo 5 medicamentos por página.
- O sistema DEVE exibir indicadores de validade coloridos para cada medicamento (Vermelho para vencido, Amarelo para vencimento nos próximos 30 dias, Verde para data válida com mais de 30 dias).

#### Scenario: Visualização da listagem de medicamentos
- **WHEN** o usuário acessa a rota `/medicamentos`
- **THEN** o sistema busca os medicamentos na API, exibe a tabela paginada com a busca e calcula os badges de validade

#### Scenario: Filtragem por termo de busca
- **WHEN** o usuário digita "Dipirona" no campo de busca
- **THEN** o sistema filtra a listagem exibindo somente os registros cujo nome, marca ou fabricante contenham o termo digitado

---

### Requirement: Cadastro de Medicamentos
O sistema deve permitir a inclusão de novos medicamentos através de um formulário de cadastro amigável.
- O formulário DEVE possuir os campos: Nome, Marca, Fabricante e Data de Vencimento.
- Todos os campos DEVEM ser obrigatórios para submissão.
- A inserção de dados DEVE ser validada localmente e enviada via requisição POST para a API `/medicamentos`.
- Após o sucesso, o sistema DEVE fechar o formulário, recarregar a lista e exibir um toast de sucesso.

#### Scenario: Cadastro realizado com sucesso
- **WHEN** o usuário clica no botão "+ Cadastrar Novo", preenche todos os campos obrigatórios e clica em "Salvar"
- **THEN** o sistema envia os dados via POST para a API, fecha o modal, atualiza a lista e exibe um alerta de sucesso

---

### Requirement: Edição de Medicamentos
O sistema deve permitir a alteração dos dados de um medicamento já cadastrado.
- O formulário de edição DEVE abrir em formato modal, populado com os dados existentes do medicamento selecionado.
- Os dados atualizados DEVEM ser enviados via requisição PUT para o endpoint `/medicamentos/:id`.
- Após o sucesso, o sistema DEVE fechar o formulário, recarregar a lista e exibir um toast de sucesso.

#### Scenario: Edição concluída com sucesso
- **WHEN** o usuário clica em "Editar" na linha de um medicamento, altera o nome e clica em "Salvar"
- **THEN** o sistema envia os dados via PUT para o endpoint do medicamento correspondente, fecha o modal, atualiza a listagem e exibe um alerta de sucesso

---

### Requirement: Exclusão de Medicamentos
O sistema deve permitir a remoção definitiva de um medicamento do estoque.
- O sistema DEVE pedir confirmação visual do usuário antes de realizar a exclusão.
- Caso confirmado, o sistema DEVE enviar uma requisição DELETE para a API `/medicamentos/:id`.
- Após o sucesso, o sistema DEVE atualizar a listagem e exibir um toast de sucesso.

#### Scenario: Exclusão confirmada pelo usuário
- **WHEN** o usuário clica em "Excluir" em um medicamento da lista e aceita a confirmação visual
- **THEN** o sistema envia a requisição DELETE para `/medicamentos/:id`, remove o medicamento da listagem e exibe um alerta de sucesso
