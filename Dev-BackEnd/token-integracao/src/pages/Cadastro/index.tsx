import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router'

function Cadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [cadastro, setCadastro] = useState(false)
    const navigate = useNavigate()



    const cadastrar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/cadastro", {
                nome,
                email,
                senha
            })
            navigate('/login')
            if (response?.data) {
                setCadastro(response.data)
                alert("Usuário cadastrado com sucesso")
                setCadastro(false)
            }

        } catch (error) {
            console.log(error)
            alert("Erro ao cadastrar, certifique-se de preencher todos oscampos")

        }
    }

    return (
        <>
            < div className='flex flex-col bg-gray-400 w-full justify-center items-center h-screen'>
                <form className='flex  gap-2 w-full flex-col items-center justify-center'>

                    <label htmlFor="name">Nome</label>
                    <input type="name" className='bg-white' onChange={(e) => setNome(e.target.value)} id='' />

                    <label htmlFor="email">Email</label>
                    <input className='bg-white' type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

                    <label htmlFor="password">Senha</label>
                    <input className='bg-white ' type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />

                </form>
                <button onClick={cadastrar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl '>Cadastrar-se</button>

                <button onClick={() => setCadastro(false)}> Ir para o Login</button>

            </div >
        </>
    )
}

export default Cadastro
