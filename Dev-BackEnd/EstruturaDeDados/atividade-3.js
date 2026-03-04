class Queue {

    constructor() {
        this.eldery = new Array()
        this.inicioEldery = 0

        this.normal = new Array()
        this.inicio = 0
    }

    enqueue(value) {
        if (value.isEldery) {
            this.eldery.push(value)
        }
        else {
            this.normal.push(value)
        }
    }

    dequeue() {
        if (this.inicioEldery < this.eldery.length){
            const removido = this.eldery[this.inicioEldery]
            this.eldery [this.inicioEldery] = undefined
            this.inicioEldery ++
            return removido
        }else if (this.inicio < this.normal.length){
            const removido = this.normal[this.inicio]
            this.normal [this.inicio] = undefined
            this.inicio ++
            return removido
        }
    }

    mostrarTamanho() {
        return (this.eldery.length - this.inicioEldery) + (this.normal.length - this.inicio)
    }
    mostrarFila() {
        const idososRestantes = this.eldery.slice(this.inicioEldery)
        const normaisRestantes = this.normal.slice(this.inicio)
        return idososRestantes.concat(normaisRestantes)
    }

}

const fila = new Queue();

fila.enqueue({ nome: "Ronald", isEldery: false })
fila.enqueue({ nome: "Felipe", isEldery: false })
fila.enqueue({ nome: "Fred", isEldery: false })

fila.enqueue({ nome: "Sebastião", isEldery: true })
fila.enqueue({ nome: "Jertrude", isEldery: true })
fila.enqueue({ nome: "Terezinha", isEldery: true })++

fila.dequeue()
fila.dequeue()
fila.enqueue({ nome: "Jertrude", isEldery: true })

console.table(fila.mostrarFila())