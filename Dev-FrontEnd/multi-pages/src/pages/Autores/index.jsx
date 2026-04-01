import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Autores = () => {
    const [autores, setAutores] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/autores")
            .then(res => res.json())
            .then(data => {
                setAutores(data)
            })
    }, [])


    return (
        <>
            <div className='flex gap-5 pt-5'>
                {
                    autores.map(autores => (
                        <div key={autores.id} className='card' >
                            <h2>{autores.nome}</h2>
                            <img src={autores.foto} />
                            <h3>{autores.obra_principal}</h3>
                            <h2>{autores.nascimento}</h2>
                            <p>{autores.descricao}</p>

                            <Link
                                to={`/autores/${autores.id}`}
                                className='text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded'
                            >
                                Saiba mais
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Autores