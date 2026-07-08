import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaPills, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import Pagination from '../Pagination'

const ITEMS_PER_PAGE = 5

const MedicinesStock = () => {
    const [medicines, setMedicines] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    
    // Estados do Modal (serão integrados na etapa 4)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMedicine, setSelectedMedicine] = useState(null)

    // Buscar dados na API do json-server
    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:3000/medicamentos')
            if (response && response.data) {
                setMedicines(response.data)
            }
        } catch (error) {
            console.error('Erro ao buscar medicamentos:', error)
            toast.error('Erro ao obter os dados de estoque.', {
                autoClose: 2000,
                hideProgressBar: true
            })
        }
    }

    useEffect(() => {
        fetchMedicines()
    }, [])

    // Formatar data de YYYY-MM-DD para DD/MM/YYYY
    const formatDate = (dateStr) => {
        if (!dateStr) return '-'
        const parts = dateStr.split('-')
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`
        }
        return dateStr
    }

    // Calcular status de validade e retornar classes CSS do badge
    const getExpirationStatus = (vencimento) => {
        if (!vencimento) return { text: 'Sem data', className: 'bg-gray-100 text-gray-800 border border-gray-200' }

        const parts = vencimento.split('-')
        if (parts.length !== 3) return { text: 'Data inválida', className: 'bg-gray-100 text-gray-800 border border-gray-200' }

        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10) - 1 // Mês no JS é 0-indexado
        const day = parseInt(parts[2], 10)

        const expiryDate = new Date(year, month, day)
        expiryDate.setHours(0, 0, 0, 0)

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const diffTime = expiryDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 0) {
            return {
                text: 'Vencido ⚠️',
                className: 'bg-red-100 text-red-700 border border-red-200 font-semibold px-2.5 py-1 rounded-full text-xs'
            }
        } else if (diffDays <= 30) {
            const daysText = diffDays === 0 ? 'hoje' : `em ${diffDays} dias`
            return {
                text: `Vence ${daysText} ⚠️`,
                className: 'bg-amber-100 text-amber-700 border border-amber-200 font-semibold px-2.5 py-1 rounded-full text-xs'
            }
        } else {
            return {
                text: 'Válido',
                className: 'bg-green-100 text-green-700 border border-green-200 font-semibold px-2.5 py-1 rounded-full text-xs'
            }
        }
    }

    // Busca textual em tempo real
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1) // Volta para a primeira página ao filtrar
    }

    const filteredMedicines = medicines.filter((med) =>
        [med.nome, med.marca, med.fabricante]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    // Paginação
    const paginatedMedicines = filteredMedicines.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    // Exclusão (será integrada na etapa 5)
    const handleDelete = async (id, name) => {
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o medicamento "${name}" do estoque?`)
        if (!confirmDelete) return

        try {
            await axios.delete(`http://localhost:3000/medicamentos/${id}`)
            toast.success('Medicamento excluído com sucesso!', {
                autoClose: 2000,
                hideProgressBar: true
            })
            fetchMedicines()
        } catch (error) {
            console.error('Erro ao excluir medicamento:', error)
            toast.error('Erro ao excluir o medicamento.', {
                autoClose: 2000,
                hideProgressBar: true
            })
        }
    }

    return (
        <div className="bg-white shadow rounded-2xl p-6 mt-8 text-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-cyan-800 flex items-center gap-2">
                        <FaPills className="text-cyan-700" />
                        Estoque de Medicamentos
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Gerencie a validade, marcas e fabricantes de remédios em estoque.</p>
                </div>
                
                <button
                    onClick={() => {
                        setSelectedMedicine(null)
                        setIsModalOpen(true)
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-700 text-white font-medium rounded-lg hover:bg-cyan-800 transition shadow cursor-pointer text-sm"
                >
                    <FaPlus size={14} />
                    Cadastrar Novo
                </button>
            </div>

            {/* Filtros e Busca */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 w-full sm:w-96 focus-within:ring-2 focus-within:ring-cyan-600 focus-within:border-transparent focus-within:bg-white transition mb-6">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar por nome, marca ou fabricante..."
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                />
            </div>

            {/* Listagem */}
            {filteredMedicines.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase bg-gray-50">
                                <th className="py-3 px-4">Nome</th>
                                <th className="py-3 px-4">Marca</th>
                                <th className="py-3 px-4">Fabricante</th>
                                <th className="py-3 px-4">Vencimento</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {paginatedMedicines.map((med) => {
                                const status = getExpirationStatus(med.vencimento)
                                return (
                                    <tr key={med.id} className="hover:bg-gray-50/50 transition">
                                        <td className="py-3.5 px-4 font-semibold text-gray-800">{med.nome}</td>
                                        <td className="py-3.5 px-4 text-gray-600">{med.marca}</td>
                                        <td className="py-3.5 px-4 text-gray-600">{med.fabricante}</td>
                                        <td className="py-3.5 px-4 text-gray-600">{formatDate(med.vencimento)}</td>
                                        <td className="py-3.5 px-4 text-center">
                                            <span className={status.className}>
                                                {status.text}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedMedicine(med)
                                                        setIsModalOpen(true)
                                                    }}
                                                    className="p-1.5 text-cyan-700 hover:bg-cyan-50 rounded-lg transition cursor-pointer"
                                                    title="Editar medicamento"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(med.id, med.nome)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                                    title="Excluir medicamento"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredMedicines.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500 text-sm">Nenhum medicamento encontrado para a busca realizada.</p>
                </div>
            )}

            {/* Aqui será adicionado o MedicineModal na etapa 4 */}
        </div>
    )
}

export default MedicinesStock
