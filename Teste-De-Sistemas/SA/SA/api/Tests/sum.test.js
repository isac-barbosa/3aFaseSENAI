import { validateAnimal, calculateDiscount } from "../services/animalServices";

describe('validateAnimal', () => {
  test('Deve validar  preço', () => {
    const animal = { name: "Thor", species: "Bulldog", price: -10 }
    const result = validateAnimal(animal)

    expect(result.name).toBe("Thor")
    expect(result.species).toBe("Bulldog")
    expect(result.price).toBe(10)
    // return {
    //   name: animal.name,
    //   species: animal.species,
    //   price: animal.price
    // }
  })
  test('Deve lançar erro se idade não for número', () => {
    const animal = {
      name: "Thor",
      species: "Bulldog",
      price: 10,
      age: "5"
    }

    expect(() => validateAnimal(animal)).toThrow("Age must be a number")
  })
  test('Deve aceitar idade como número', () => {
    const animal = {
      name: "Thor",
      species: "Bulldog",
      price: 10,
      age: 5
    }

    const result = validateAnimal(animal)

    expect(result.name).toBe("Thor")
  })

})

describe('calculateDiscount', () => {
  test('Deve aplicar desconto de 10% para membro', () => {
    const result = calculateDiscount(100, true)
    expect(result).toBe(90)
  })
})