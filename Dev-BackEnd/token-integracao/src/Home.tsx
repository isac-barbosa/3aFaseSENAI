import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type Props = {
    setDataLogin: (data: any) => void;
}

export const Home = ({ setDataLogin }: Props) => {
    const [dadosUsuarios, setDadosUsuarios] = useState<any>(null)
    const deslogar = () => {
        localStorage.clear()
        setDataLogin(null)
    }

    const dadosUsuario: any = jwtDecode(localStorage.getItem('tokenAcesso') || "");

    const buscarDadosUsuario = async () => {
        try {
            const response = await axios.get("http://localhost:3000/usuarios", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("tokenAcesso")}`
                }
            })
            if (response?.data) {
                setDadosUsuarios(response.data)
            }
        } catch (error) {
            console.log(error)
            alert("Erro ao fazer o login, verifique suas credenciais!")
        }
    }

    useEffect(() => {
        buscarDadosUsuario()
    }, [])

    return (
        <div className='flex gap-10 flex-col bg-gray-400 w-full pt-32 items-center h-screen'>
            <h1 className='text-2xl font-semibold text-white'>Seja bem-vindo {dadosUsuario.nome}</h1>
            <h4 className='text-sm font-ligth  text-white'>{dadosUsuario.email}</h4>

            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosUsuarios?.map((usuario: any) => (
                        <tr key={usuario.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{usuario.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{usuario.nome}</td>
                            <td className="px-6 py-4">{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='bg-red-800 px-5 py-2 text-white rounded-2xl' onClick={deslogar}>Sair</button>

        </div>
    )
}