test('soma de dois mais dois', () => {
  expect(6 + 2).toBe(8);
});
// -----------------------------------------------------------
const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});

// ------------------------------------------------------------


const cadeado = {
   senha: 'Isac',
  }
  test(`A senha é ${cadeado.senha}` , () => {
    expect(cadeado.senha).toBe('Isac')
  });

// ---------------------------------------------------

  const cigarro1 = {
  marca: 'Gift',
  perigoso: 8,
};
const cigarro2 = {
  marca: 'Gift',
  perigoso: 8,
};

describe('Test cigarro', () => {
  test('possuem as mesmas características', () => {
    expect(cigarro1).toEqual(cigarro2);
  });
  test('Não possuem as mesmas características', () => {
    expect(cigarro1).not.toEqual(cigarro2);
  });
});