import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router'

const AutoresDetails = () => {

    const { id } = useParams()
    const [autores, setAutores] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/autores/${id}`)
            .then(res => res.json())
            .then(data => setAutores(data))
    }, [id])
    if (!autores) return <div>Carregando...</div>


    return (
        <div className='p-4 text-center'>
            <h1 className='text-4xl font-bold'>{autores.nome}</h1>
            <img src={autores.foto} auth={autores.nome} className='w-200' />
            <h1>{autores.obra_principal}</h1>
            <h1>{autores.nascimento}</h1>
            <p>{autores.descricao}</p>
            <Link
                to={`/autores`}
                className='text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded'
            >
                Voltar
            </Link>

        </div>
    )
}

export default AutoresDetails
