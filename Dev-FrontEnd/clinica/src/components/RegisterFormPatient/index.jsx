import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function RegisterFormPatient() {
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        birthdate: "",
        cpf: "",
        rg: "",
        maritalStatus: "",
        phone: "",
        email: "",
        birthplace: "",
        emergencyContact: "",
        allergies: "",
        specialCare: "",
        healthInsurance: "",
        insuranceNumber: "",
        insuranceValidity: "",
        address: {
            cep: "",
            city: "",
            state: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            reference: ""
        }
    })

    const [isSaving, setIsSaving] = useState(false)


    //handles

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))  //operador spread e propriedade computada
    }
    const handleAndressChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            adress: { ...prev.adress, [name]: value }
        }))  //operador spread e propriedade computada
    }

    const fetchAdressData = async (cep) => {
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            setFormData((prev) => ({
                ...prev,
                adress: {
                    ...prev.address,
                    cep: data.cep || "",
                    city: data.localidade || "",
                    state: data.uf || "",
                    street: data.lorgadouro || "",
                    complement: data.complemento || "",
                    neighborhood: data.bairro || ""
                }
            }))

        } catch (error) {
            console.log("Erro ao buscar endereço", error)
        }
    }

    const handleCepBlur = (e) => {
        const cep = e.target.value.replace(/\D/g, "")
        if (cep.length === 8) fetchAdressData(cep)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving
        try {
            await axios.post("http://localhost:3000/patients", formData)

            toast.success("Paciente criado com sucesso", {
                autoClose: 2000,
                hideProgressBar: true
            })

            setFormData({
                fullName: "",
                gender: "",
                birthdate: "",
                cpf: "",
                rg: "",
                maritalStatus: "",
                phone: "",
                email: "",
                birthplace: "",
                emergencyContact: "",
                allergies: "",
                specialCare: "",
                healthInsurance: "",
                insuranceNumber: "",
                insuranceValidity: "",
                address: {
                    cep: "",
                    city: "",
                    state: "",
                    street: "",
                    number: "",
                    complement: "",
                    neighborhood: "",
                    reference: ""
                }
            })
        } catch (error) {
            console.error(error)
            toast.error("Erro ao Salvar os dados!", {
                autoClose: 2000,
                hideProgressBar: true
            })
        }
    }

    return (
        <div>

        </div>
    )
}

export default RegisterFormPatient
