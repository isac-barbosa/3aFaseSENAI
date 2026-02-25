
import Card from '../../components/Card/Card'
import styles from './Body.module.css'

const Body = () => {

    const usuarios = [
        { nome: "Isac", idade: 18, cidade: "Florianópolis" },
        { nome: "Anna Beatriz", idade: 18, cidade: "Biguaçu" },
        { nome: "Julio", idade: 22, cidade: "Pelotas" },
        { nome: "Isac", idade: 18, cidade: "Florianópolis" },
        { nome: "Anna Beatriz", idade: 18, cidade: "Biguaçu" },
        { nome: "Julio", idade: 22, cidade: "Pelotas" },

    ]
    return (
        <>
            <main className={styles.body}>
                <h2>Usuarios Cadastrados</h2>
                <div className={styles.cardContainer}>
                    {usuarios.map((usuario, index) => (
                        <Card
                            key={index}
                            nome={usuario.nome}
                            idade={usuario.idade}
                            cidade={usuario.cidade}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}


export default Body
