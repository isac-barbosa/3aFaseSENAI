# Atividades Práticas — Testes com Jest e React Testing Library

Este material reúne quatro atividades progressivas para praticar testes em projetos React com Vite, Jest e React Testing Library.

A proposta é começar com testes de lógica pura, avançar para renderização de componentes, depois simular interações do usuário e, por fim, validar estados visuais condicionais.

---

## Estrutura sugerida de pastas

```txt
src/
  components/
    Greeting.jsx
    Counter.jsx
    StatusButton.jsx
  functions/
    formatCurrency.js
tests/
  formatCurrency.test.js
  Greeting.test.jsx
  Counter.test.jsx
  StatusButton.test.jsx
```

---

# Atividade 1: Testando Lógica Pura

## Tema

Testes de funções utilitárias.

Antes de testar componentes React, vamos relembrar as funções isoladas. Isso vain ajuda a relembrar funcionamento básico do `expect()` e dos matchers do Jest. (usem a documentaco do jest para duvidas com os matchers : https://jestjs.io)

## Objetivo

Praticar matchers básicos, principalmente:

```js
toBe();
```

## Tarefa

Criar uma função chamada `formatCurrency(value)` que receba um número e retorne esse valor formatado em Real brasileiro.

A função deve retornar:

```txt
R$ 10,50
```

quando receber:

```js
10.5;
```

## Arquivo sugerido

Crie o arquivo:

```txt
src/functions/formatCurrency.js
```

## Implementação esperada

```js
export function formatCurrency(value) {
  // sua validacao aq
}
```

## Arquivo de teste

Crie o arquivo:

```txt
tests/formatCurrency.test.js
```

## Teste esperado

```js
import { formatCurrency } from "../src/functions/formatCurrency";

describe("formatCurrency", () => {
  // seu teste aqui
});
```

## Observação importante

Dependendo do ambiente, o espaço entre `R$` e o valor pode ser um espaço comum ou um espaço especial chamado `non-breaking space`.

Se o teste falhar visualmente mesmo parecendo igual, uma alternativa é testar assim:

```js
expect(formatCurrency(10.5).replace(/\s/g, " ")).toBe("R$ 10,50");
```

---

# Atividade 2: Renderização de Componente e Verificação de Texto

## Tema

Testes de renderização de componentes React.

Nesta atividade, vamos testar se uma informação recebida por `props` aparece corretamente na tela.

## Objetivo

Entender como verificar se um componente renderiza corretamente um texto.

## Conceitos praticados

- Renderização de componente;
- Uso de `props`;
- Uso de `screen.getByText()`;
- Uso do matcher `toBeInTheDocument()`.

## Tarefa

Criar um componente chamado `<Greeting name="João" />`.

O componente deve renderizar:

```html
<h1>Olá, João</h1>
```

## Arquivo sugerido

Crie o arquivo:

```txt
src/components/Greeting.jsx
```

## Implementação esperada

```jsx
export function Greeting({ name }) {
  return <h1>Olá, {name}</h1>;
}
```

## Arquivo de teste

Crie o arquivo:

```txt
tests/Greeting.test.jsx
```

## Teste esperado

```jsx
import { render, screen } from "@testing-library/react";
import { Greeting } from "../src/components/Greeting";

describe("Greeting", () => {
  it("deve renderizar a saudação com o nome recebido por props", () => {
    render(<Greeting name="João" />);

    expect(screen.getByText("Olá, João")).toBeInTheDocument();
  });
});
```

## Desafio extra

Altere o nome para outro valor e verifique se o componente continua funcionando:

```jsx
render(<Greeting name="Maria" />);

expect(screen.getByText("Olá, Maria")).toBeInTheDocument();
```

---

# Atividade 3: Interação do Usuário

## Tema

Eventos de clique.

Nesta atividade, vamos testar o comportamento de um componente após uma ação do usuário.

## Objetivo

Entender que testes unitários de componentes devem focar no comportamento visível para o usuário, e não na implementação interna.

O teste não deve se preocupar com o nome do estado interno, como `count` ou `setCount`. Ele deve verificar o que aparece na tela depois da interação.

## Conceitos praticados

- Estado com `useState`;
- Evento de clique;
- `userEvent.click()`;
- Verificação de alteração na tela;
- Teste baseado em comportamento.

## Tarefa

Criar um componente de contador simples com:

- Um número inicial igual a `0`;
- Um botão com o texto `Incrementar`;
- Ao clicar no botão, o número deve aumentar para `1`.

## Arquivo sugerido

Crie o arquivo:

```txt
src/components/Counter.jsx
```

## Implementação esperada

```jsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount((currentValue) => currentValue + 1);
  }

  return (
    <div>
      <p>Contador: {count}</p>
      <button type="button" onClick={handleIncrement}>
        Incrementar
      </button>
    </div>
  );
}
```

## Arquivo de teste

Crie o arquivo:

```txt
tests/Counter.test.jsx
```

## Teste esperado com userEvent

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../src/components/Counter";

describe("Counter", () => {
  it("deve incrementar o contador quando o botão for clicado", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    expect(screen.getByText("Contador: 0")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Incrementar" }));

    expect(screen.getByText("Contador: 1")).toBeInTheDocument();
  });
});
```

## Alternativa com fireEvent

Embora `userEvent` seja mais recomendado para simular ações reais do usuário, também é possível usar `fireEvent`.

```jsx
import { fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "../src/components/Counter";

describe("Counter", () => {
  it("deve incrementar o contador quando o botão for clicado", () => {
    render(<Counter />);

    expect(screen.getByText("Contador: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Incrementar" }));

    expect(screen.getByText("Contador: 1")).toBeInTheDocument();
  });
});
```

## Desafio extra

Faça o teste clicar três vezes no botão e verifique se o contador chega em `3`.

---

# Atividade 4: Testes de Estilo e Estados Condicionais

## Tema

Validação de estados visuais.

Nesta atividade, vamos testar se um componente muda seu estilo de acordo com uma propriedade recebida.

## Objetivo

Validar logicamente estados visuais, como:

- Desabilitado;
- Loading;
- Erro;
- Sucesso;
- Alerta.

## Conceitos praticados

- Props condicionais;
- Estilos inline;
- Matcher `toHaveStyle()`;
- Estado visual baseado em regra.

## Tarefa

Criar um botão que recebe a prop `disabled`.

Se `disabled` for `true`, o botão deve:

- Ficar desabilitado;
- Ter a cor de fundo vermelha.

## Arquivo sugerido

Crie o arquivo:

```txt
src/components/StatusButton.jsx
```

## Implementação esperada

```jsx
export function StatusButton({ disabled = false }) {
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "red" : "green",
        color: "white",
      }}
    >
      Enviar
    </button>
  );
}
```

## Arquivo de teste

Crie o arquivo:

```txt
tests/StatusButton.test.jsx
```

## Teste esperado

```jsx
import { render, screen } from "@testing-library/react";
import { StatusButton } from "../src/components/StatusButton";

describe("StatusButton", () => {
  it("deve aplicar fundo vermelho quando estiver desabilitado", () => {
    render(<StatusButton disabled />);

    const button = screen.getByRole("button", { name: "Enviar" });

    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ backgroundColor: "red" });
  });
});
```

## Desafio extra

Crie um segundo teste para verificar o comportamento quando o botão não estiver desabilitado:

```jsx
it("deve aplicar fundo verde quando estiver habilitado", () => {
  render(<StatusButton />);

  const button = screen.getByRole("button", { name: "Enviar" });

  expect(button).not.toBeDisabled();
  expect(button).toHaveStyle({ backgroundColor: "green" });
});
```

---

# Checklist final

Ao concluir as quatro atividades, eu espero que voces saibam/entendem a logica de:

- Criar e testar uma função utilitária;
- Usar `describe`, `it` e `expect`;
- Usar matchers como `toBe()`, `toBeInTheDocument()`, `toBeDisabled()` e `toHaveStyle()`;
- Renderizar componentes React em ambiente de teste;
- Buscar elementos com `screen.getByText()` e `screen.getByRole()`;
- Simular cliques com `userEvent.click()`;
- Testar comportamento visível para o usuário;
- Validar estilos condicionais em componentes.

---

# Comando para rodar os testes

```bash
npm test
```

ou, se estiver usando PNPM (ou qualquer outro gerenciador de dependencias do javascript):

```bash
pnpm test
```

---

# Resultado esperado

Ao final, todos os testes devem passar com sucesso.

```txt
PASS tests/formatCurrency.test.js
PASS tests/Greeting.test.jsx
PASS tests/Counter.test.jsx
PASS tests/StatusButton.test.jsx
```
