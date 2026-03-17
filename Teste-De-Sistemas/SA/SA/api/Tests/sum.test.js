import { validateAnimal } from "../services/animalServices";

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

})