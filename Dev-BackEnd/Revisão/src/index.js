import {buscarLivroPorId} from './bibliotecaService.js';
import { buscarProdutoPorId, insertProduto } from './prova.js';
import {pool} from './config.js';

async function main(){
    // await buscarLivroPorId(1)
    //     const dataInicial = "2026-01-01 00:00:00";
    // const dataFinal = "2026-12-31 23:59:59";
    // console.log(await livrosMaiorSaidaNoPeriodo(dataInicial, dataFinal))

    await buscarProdutoPorId(1);
    await insertProduto
}

main().catch(error =>
    console.error(error)
).finally(async() =>{
    await pool.end();
})
