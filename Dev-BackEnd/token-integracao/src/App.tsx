import { useState } from 'react'
import axios from "axios"
import './App.css'
import Cadastro from './pages/Cadastro'

function App() {


  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [dataLogin, setDataLogin] = useState(null)
  const [cadastro, setCadastro] = useState(true)

  const logar = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha
      })
      if (response?.data) {
        setDataLogin(response.data)
      }

    } catch (error) {
      console.log(error)
      alert("Erro ao fazer o login, verifique suas credenciais")

    }
  }

  return (
    <>
      {dataLogin !== null ? (
        <div className='flex flex-col bg-gray-500 w-full pt-32 items-center h-screen'>
          <h1 className='text-2xl font-semibold text-white'>Seja bem-vindo fulaninho</h1>
          <button className='bg-red-800 px-5 py-2 text-white rounded-2xl' onClick={() => setDataLogin(null)}>Sair</button>
        </div>
      ) :
        cadastro ? <Cadastro/> : (< div className='flex flex-col bg-gray-400 w-full justify-center items-center h-screen'>
          <form className='flex  gap-2 w-full flex-col items-center justify-center'>
            <label htmlFor="email">Email</label>

            <input className='bg-white' type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="" />

            <label htmlFor="password">Senha</label>

            <input className='bg-white ' type="password" onChange={(e) => setSenha(e.target.value)} name="password" id="" />
          </form>
          <button onClick={logar} className='bg-gray-800 px-5 py-2 text-white rounded-2xl'>Login</button>
          <button  className='bg-blue-800 px-5 py-2 text-white rounded-2xl mt-2 ' onClick={() =>setCadastro(true)} > Ir para o cadastro</button>
          <button onClick={() => setCadastro(false)}> Já tenho conta</button>

        </div >)}



    </>
  )
}

export default App
