import { Router } from "express";
import { createHash } from "../utils/createHash";
import { prisma } from "../prisma/prisma";
import type { Consulta } from "../prisma/generated/prisma/client";
import bcrypt from "bcrypt";


export const consultaRouter = Router();

consultaRouter.get('/consulta', async (_, res) => {
    const consulta = await prisma.consulta.findMany();
    res.json(consulta);
})

consultaRouter.get('/consulta/:id', async (req, res) => {
    const idConsulta = Number(req.params.id)
    const consulta = await prisma.consulta.findUnique({
        where: {
            id: idConsulta
        }
    })
    return res.status(200).json(consulta)
})


consultaRouter.post("/consulta", async (req, res) => {
    console.log(req.body)
    const dadosConsulta = req.body as Consulta
    const consultaCriada = await prisma.consulta.create({
        data: {
            motivo: dadosConsulta.motivo,
            data_consulta: dadosConsulta.data_consulta,
            observacoes: dadosConsulta.observacoes,
            medico_responsavel_id: dadosConsulta.medico_responsavel_id,
            paciente_id: dadosConsulta.paciente_id   
        }
    })
    return res.status(201).json(consultaCriada)
})


consultaRouter.put('/consulta/:id', async (req, res) => {
    const idConsulta = Number(req.params.id)
    const dadosParaAtualizar = req.body as Omit<Consulta, 'id'>
    await prisma.consulta.update({
        data: {
            ...dadosParaAtualizar
        },
        where: {
            id: idConsulta
        }
    })
    const consultaAtualizado = await prisma.consulta.findUnique({
        where: {
            id: idConsulta
        }
    })
    return res.status(200).json(consultaAtualizado)
})


consultaRouter.delete('/consulta/:id', async (req, res) => {
    const idConsulta = Number(req.params.id)
    const deletarConsulta = await prisma.consulta.delete({
        where: {
            id: idConsulta
        }
    })
    return res.status(200).json({
        message: "Usuário deletado com sucesso",
        data: deletarConsulta
    })
})