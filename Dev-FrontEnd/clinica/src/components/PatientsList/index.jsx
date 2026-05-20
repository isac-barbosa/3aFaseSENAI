import { useState, useEffect } from "react"
import axios from "axios"
import { FaUserAlt } from 'react-icons/fa'
import { Link } from "react-router"

const PatientsList = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [ages, setAges] = useState({})

    const calculateAge = (birthdate) => {
        if (!birthdate) return "-"
        const today = new Date()
        const birthdateDate = new Date(birthdate)
        let age = today.getFullYear() - birthdateDate.getFullYear()
        const monthDiff = today.getMonth() - birthdateDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
            age--
        }
        return age
    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:3000/patients")
                if (!response) return

                const patientsData = response.data

                // calcula a idade de cada paciente e armazena no estado

                const calculatedAges = {}
                patientsData.forEach((patient) => {
                    calculatedAges[patient.id] = calculateAge(patient.birthdate)
                })
                setAges(calculatedAges)
                setPatients(patientsData)

            } catch (error) {
                console.error("Erro ao obter os dados de paciente", error)
            }
        }
        fetchPatients()
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredPatients = patients.filter((patient) =>
        [patient.fullName, patient.email, patient.phone]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )


    return (
        <div className="bg-white shadow rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-cyan-800 mb-4">
                Informações Rápidas de Pacientes
            </h2>
            {/* {Campo de busca} */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 ">
                <label htmlFor="search" className="tet-gray-700 font-medium">
                    Buscar Paciente:
                </label>
                <input type="text" 
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Digite o nome, email ou telefone "
                        className="border rounded-lg px-3 py-2 w-full sm:w-80 focus: ring-2 focus:ring-cyan-600 outline-none"
                        
                        />
            </div>

            {/* {Lista de pacientes} */}
            {
                filteredPatients.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {
                            filteredPatients.map((patient) =>(
                                <li
                                    key={patient.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4 "
                                    >
                                        

                                    </li>
                            ))
                        }

                    </ul>
                )
                    
                
            }
        </div>
    )
}

export default PatientsList