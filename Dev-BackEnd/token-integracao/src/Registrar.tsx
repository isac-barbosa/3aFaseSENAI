import axios from "axios"
import { useState } from "react"

type Props = {
    setRegistrar: (x: any) => void;
}

export const Registrar = ({ setRegistrar }: Props) => {
    const [email, setEmail] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")

    const registrar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/cadastro", {
                email,
                nome,
                senha
            })
            if (response?.data) {
                setRegistrar(false)
                alert("Usuário criado com sucesso!")
            }
        } catch (error) {
            console.log(error)
            alert("Erro ao fazer o cadastro, tente novamente!")
        }
    }

    return (
        < div className='flex flex-col bg-gray-400 w-full justify-center items-center h-screen'>
            <form className='flex  gap-2 w-full flex-col items-center justify-center'>
                <label htmlFor="nome">Nome</label>

                <input type="text" onChange={(e) => setNome(e.target.value)} name="nome" id="" />

                <label htmlFor="email">Email</label>

                <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

                <label htmlFor="password">Senha</label>

                <input type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
            </form>
            <button onClick={registrar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>Cadastrar</button>

        </div >
    )
}