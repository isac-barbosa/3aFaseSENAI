import {pool} from './config.js';

export async function buscarProdutoPorId(ProdutoId){
    const [rows] = await pool.query("SELECT * from produto WHERE id_produto=? ", 
        [ProdutoId]
    )
    console.log(rows)
    return rows[0]
}
export async function insertProduto(id_produto, nome, categoria, valor_unitario) {
    const [rows] = await pool.query('INSERT INTO produto(id_produto, titulo, categoria, valor_unitario) VALUES (?, ?, ?, ?)',
        [id_produto, nome, categoria, valor_unitario]
    )
        console.log(rows)
        return rows
}
