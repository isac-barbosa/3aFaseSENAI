class Funcionario {
    nome: string
    salarioBase: number
    constructor( nome: string, salarioBase: number) {
        this.nome = nome
        this.salarioBase = salarioBase

    }

    calcularSalario(): number {
        return this.salarioBase 
    }
}
class Programador extends Funcionario {

    constructor( nome: string, salarioBase: number) {
        super(nome, salarioBase);
    }
    calcularSalario(): number {
        const salarioProgramador = this.salarioBase + (this.salarioBase * 3.2);
        return salarioProgramador
    }
}

class Designer extends Funcionario{

    constructor( nome: string, salarioBase: number){
        super( nome, salarioBase);
    }
        calcularSalario(): number {
        const salarioDesginer = this.salarioBase + (this.salarioBase * 2.7);
        return salarioDesginer;
    }
}
const isac = new Programador('Isac recebe', 1000)
const bia = new Programador('Bia recebe', 1300)
const angelica = new Designer('Luan recebe', 2800)

console.log(`Salário  de Isac ${isac.calcularSalario()}R$`)
console.log(`Salário  de Beatriz ${bia.calcularSalario()}R$`)
console.log(`Salário  de Angélica ${angelica.calcularSalario()}R$`)
