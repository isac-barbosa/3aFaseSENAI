import { Router } from "express";
import { createHash } from "../utils/createHash";
import { prisma } from "../prisma/prisma";
import type { Paciente } from "../prisma/generated/prisma/client";
import bcrypt from "bcrypt";


export const pacienteRouter = Router();

pacienteRouter.get('/pacientes', async (_, res) => {
    const pacientes = await prisma.paciente.findMany();
    res.json(pacientes);
})

pacienteRouter.get('/pacientes/:id', async (req, res) => {
    const idPaciente = Number(req.params.id)
    const paciente = await prisma.paciente.findUnique({
        where: {
            id: idPaciente
        }
    })
    return res.status(200).json(paciente)
})


pacienteRouter.post("/pacientes", async (req, res) => {
    console.log(req.body)
    const dadosPaciente = req.body as Paciente
    const pacienteCriado = await prisma.paciente.create({
        data: {
            nome: dadosPaciente.nome,
            cpf: dadosPaciente.cpf,
            telefone: dadosPaciente.telefone,
            email: dadosPaciente.email,
            data_nascimento: dadosPaciente.data_nascimento,
            sexo: dadosPaciente.sexo,
            responsavel: dadosPaciente.responsavel           
        }
    })
    return res.status(201).json(pacienteCriado)
})


pacienteRouter.put('/pacientes/:id', async (req, res) => {
    const idPaciente = Number(req.params.id)
    const dadosParaAtualizar = req.body as Omit<Paciente, 'id'>
    await prisma.paciente.update({
        data: {
            ...dadosParaAtualizar
        },
        where: {
            id: idPaciente
        }
    })
    const pacienteAtualizado = await prisma.paciente.findUnique({
        where: {
            id: idPaciente
        }
    })
    return res.status(200).json(pacienteAtualizado)
})


pacienteRouter.delete('/pacientes/:id', async (req, res) => {
    const idPaciente = Number(req.params.id)
    const deletarpaciente = await prisma.paciente.delete({
        where: {
            id: idPaciente
        }
    })
    return res.status(200).json({
        message: "Usuário deletado com sucesso",
        data: deletarpaciente
    })
})