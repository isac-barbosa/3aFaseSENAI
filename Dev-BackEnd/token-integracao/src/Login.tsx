import axios from "axios"
import { useState } from "react"

type Props = {
    setDataLogin: (data: any) => void;
    setRegistrar: (registrar: boolean) => void;
}

export const Login = ({ setDataLogin, setRegistrar }: Props) => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const logar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                senha
            })
            if (response?.data) {
                setDataLogin(response.data)
                localStorage.setItem("tokenAcesso", response.data.accessToken)
                localStorage.setItem("tokenRefresh", response.data.refreshToken)
            }
        } catch (error) {
            console.log(error)
            alert("Erro ao fazer o login, verifique suas credenciais!")
        }
    }

    return (
        < div className='flex flex-col bg-gray-400 w-full justify-center items-center h-screen'>
            <form className='flex  gap-2 w-full flex-col items-center justify-center'>
                <label htmlFor="email">Email</label>

                <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

                <label htmlFor="password">Senha</label>

                <input type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
            </form>
            <button onClick={logar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>Login</button>
            <a className="cursor-pointer font-bold" onClick={() => setRegistrar(true)}>Não possui conta? Se cadastre aqui</a>
        </div >
    )
}