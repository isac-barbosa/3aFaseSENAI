import { Router } from "express";
import { createHash } from "../utils/createHash";
import { prisma } from "../prisma/prisma";
import type { Exame } from "../prisma/generated/prisma/client";
import bcrypt from "bcrypt";

export const exameRouter = Router();

exameRouter.get('/exame', async (req, res) => {
    const exames = await prisma.exame.findMany()
    res.json(exames)
})


exameRouter.post('/exame', async (req, res) => {
    const dadosExame = req.body as Exame
    const dadosExameCriado = await prisma.exame.create({
        data: {
            tipo_exame: dadosExame.tipo_exame,
            valor: dadosExame.valor,
            descricao: dadosExame.descricao,
            resultado: dadosExame.resultado,
            data_exame: new Date(dadosExame.data_exame)

        }
    })
    return res.status(201).json(dadosExameCriado)
})
exameRouter.get('/exame/:id', async (req, res) => {
    const idExame = Number(req.params.id)
    const exame = await prisma.exame.findUnique({
        where: {
            id: idExame
        }
    })
    return res.status(200).json(exame)
})

exameRouter.put('/exame/:id', async (req, res) => {
    const idExame = Number(req.params.id)
    const dadosAtualizados = req.body as Omit<Exame, "id">
    console.log(dadosAtualizados)
    await prisma.exame.update({
        data: {
            ...dadosAtualizados,
            data_exame: new Date(dadosAtualizados.data_exame)
        },
        where: {
            id: idExame
        }
    })
    const exameAtualizado = await prisma.exame.findUnique({
        where: {
            id: idExame
        }
    })
    return res.status(201).json(exameAtualizado)
})


exameRouter.delete('/exame/:id', async (req, res) => {
    const idExame = Number(req.params.id)
    const deletarExame = await prisma.exame.delete({
        where: {
            id: idExame
        }
    })
    return res.status(200).json({
        message: "Exame deletado com sucesso",
        data: deletarExame
    })
})

