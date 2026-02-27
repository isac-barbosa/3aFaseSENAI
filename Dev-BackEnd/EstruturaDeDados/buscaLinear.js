function gerarUmMilhaoDeNumeros() {
    const tamanho = 100000000;
    // Utilizando Float64Array para performance e precisão
    const arr = new Array(tamanho); 
    
    for (let i = 0; i < tamanho; i++) {
        // Preenchendo com números aleatórios entre 0 e 1000
        arr[i] = Math.random() * 1000; 
    }
    return arr;
}

const meuArray = gerarUmMilhaoDeNumeros();
function buscaLinear(arr, valor) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === valor) {
      return i;
    }
  }
  return -1;
}

console.log(buscaLinear(meuArray, 21));