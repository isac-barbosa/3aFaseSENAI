
// Classe Produto
class Produto {
  nome: string;
  preco: number;

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }
}

// Classe Categoria
class Categoria {
  nome: string;
  desconto: number; 
  constructor(nome: string, desconto: number) {
    this.nome = nome;
    this.desconto = desconto;
  }

  calcularPrecoComDesconto(produto: Produto): number {
    const precoComDesconto = produto.preco - (produto.preco * (this.desconto / 100));
    return precoComDesconto;
  }
}

const camiseta = new Produto('Camiseta', 50);
const verao = new Categoria('Verão', 10); 

const precoFinal = verao.calcularPrecoComDesconto(camiseta);

console.log(`Produto: ${camiseta.nome}`);
console.log(`Preço original: R$${camiseta.preco}`);
console.log(`Categoria: ${verao.nome}`);
console.log(`Desconto: ${verao.desconto}%`);
console.log(`Preço com desconto: R$${precoFinal.toFixed(2)}`);
