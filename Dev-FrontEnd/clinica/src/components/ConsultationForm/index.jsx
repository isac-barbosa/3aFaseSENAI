import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

//modal
import Modal from "../Modal"

const ConstultationForm = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState([])
    const [selectedPatients, setSelectedPatients] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        reason: "",
        date: "",
        time: "",
        description: "",
        medication: "",
        dosagePrecautions: "",
    })

    //busca pacientes

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:3000/patients")
                setPatients(response.data)
            } catch (error) {
                console.error("Erro ao obter dados dos pacientes", error)
            }
        }
    }, [])

    //funçoes auxiliares

    const handleSearchChange = (e) => setSearchTerm(e.target.value)

    //filtro dos pacientes

    const filteresPatients = patients.filter(
        (patient) =>
            patient.fullNmae.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm)
    )


    //seleciona o paciente
    const handleSelectPatient = (patient) => {
        setSelectedPatients(patient)
        setIsModalOpen(true)
    }

    //fecha o modal e reseta o valor do paciente selecionado

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatients(null)
    }

    //Controle os campos do estado formData dinamicamente

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    //reseta o form

    const resetForm = () => {
        setFormData({
            reason: "",
            date: "",
            time: "",
            description: "",
            medication: "",
            dosagePrecautions: "",
        })
    }


    //envia os dados

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedPatients) return

        try {
            setIsIsSaving(true)

            const dataToSave = {
                patientId:selectedPatients.id,
                ...formData
            }

            await axios.post("http://localhost:3000/consults", dataToSave)

            toast.success("Consulta cadastrada com sucesso",{
                autoClose:2000,
                hideProgressBar: true
            })

            resetForm()
            handleCloseModal()

        } catch (error) {
            console.error("Erro ao cadastrar consulta!")
            toast.error("Erro ao cadastrar consulta!", {
                autoClose: 2000,
                hideProgressBar: true
            })

        }


    }

    return (
        <section className="p-6 text-gray-600">
            {/*Campo de busca*/}


            <div className="mb-6">
                <label htmlFor="" className="block text-sm font-semibold mb-2">
                    Buscar paciente para cadastrar consulta
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Digite o nome ou o registro do paciente"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"

                />

                <div>
                    {/*Lista de pacientes */}

                    <ul className="space-y-3">
                        {
                            filteresPatients.map((patients) =>(
                                <li
                                    key={patients.id}
                                    className="p-4 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-505 transition"
                                
                                >



                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default ConstultationForm
