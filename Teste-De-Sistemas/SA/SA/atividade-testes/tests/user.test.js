import { createUser } from "../src/userService"


describe('createUser', () => {

    describe("cenários positivos", () => {
        test('deve criar usuário  ', () => {
            const userData = { name: "Isac", age: 18 }
            const result = createUser(userData)

            expect(result.name).toBe("Isac")
            expect(result.age).toBe(18)
            expect(result.isActive).toBe(true)
            expect(result.roles).toEqual(["user"])
        })
    })

    describe("cenários negativos", () => {
        test('Deve lançar erro caso  não tenha nome', () => {
            try {
                const userData = { age: 18 }

                createUser(userData)
                throw new Error("O teste falhou porque não foi retornado erro");
            } catch (error) {
                expect(error.message).toBe("O nome do usuario é obrigatorio")
            }
        })
        test('Erro caso seja menor de idade', () => {
            const userData = { name: "Isac", age: 16 }
            expect(() => createUser(userData))
                .toThrow("O usuário deve ser maior de idade")
        })
    })
})


