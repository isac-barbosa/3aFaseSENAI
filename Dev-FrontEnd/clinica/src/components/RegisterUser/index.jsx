import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const RegisterUser = () => {

    //estados de controle dos campos
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //funções que alteram o valor dos estados
    const handlEmailChange = (e) => setEmail(e.target.value)
    const handlPasswordChange = (e) => setPassword(e.target.value)
    const handlconfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    //estados (match password e validação do botão de salvar)
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    //validação do match
    const isPasswordValid = () => password.length >= 8 && password === confirmPassword
    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsPasswordMatch(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isPasswordValid()) {
            setIsPasswordMatch(false)
            return
        }
        setIsSaving(true)

        try {
            await axios.post('http://localhost:3000/users', {
                email, password
            })
            setIsSaving(false)
            resetForm()
            toast.success("Usuário criado com sucesso", {
                autoClose: 2000,
                hideProgressBar: true              
            })
        }catch (error){
            console.log("Erro ao criar usuário", error)
            toast.error('Erro ao criar o usuário!', {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }

    }

    return (
        <div className='w-full max-w-md p-6 bg-white roundedx1 shadow-lg'>
            <h2 className='text-2x1 font-bold mb-6 text-center'>Criar Usuário</h2>
            <form onSubmit={handleSubmit} >
                <fieldset>
                    <label htmlFor="email" className='block text-sm font-medium mb-1'>Email:</label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={handlEmailChange}
                        required
                        minLength={8}
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </fieldset>

                <fieldset>
                    <label htmlFor="password" className='block text-sm font-medium mb-1'>Senha:</label>
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={handlPasswordChange}
                        required
                        minLength={8}
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </fieldset>

                <fieldset>
                    <label htmlFor="confirmPassword" className='block text-sm font-medium mb-1'>confirmar senha:</label>
                    <input
                        type="password"
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={handlconfirmPasswordChange}
                        required
                        minLength={8}
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        />
                        {!isPasswordMatch && (
                            <p className='text-red-500 text-sm mt-1'>As senhas não correspondem</p>
                        )}
                </fieldset>

                <div>
                    <button
                        type='submit'
                        disabled = {isSaving}
                        className={`w-full p-2 rounded-lg text-white ${isSaving ? 'bg-gray-400 cursor-not-allowed': 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} transition-colors`}
                        >
                        {isSaving ? "Salvando...": "Criar Usuário"}
                        {/* {isSaving ? "Salvando ...": "Criar Usuário"} */}
                        
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser
