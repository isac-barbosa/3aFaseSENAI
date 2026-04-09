import { Router } from "express";
import { createHash } from "../utils/createHash";
import { prisma } from "../prisma/prisma";
import type { Usuario } from "../prisma/generated/prisma/client";
import bcrypt from "bcrypt";


export const usuarioRouter = Router();

usuarioRouter.get('/usuarios', async (_, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
})

usuarioRouter.get('/usuarios/:id', async (req, res) => {
    const idUsuario = Number(req.params.id)
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: idUsuario
        }
    })
    return res.status(200).json(usuario)
})


usuarioRouter.post("/usuarios", async (req, res) => {
    console.log(req.body)
    const dadosUsuario = req.body as Usuario
    const hash = await createHash(dadosUsuario.senha,);
    const usuarioCriado = await prisma.usuario.create({
        data: {
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null,
            senha: hash
        }
    })
    return res.status(201).json(usuarioCriado)
})


usuarioRouter.put('/usuarios/:id', async (req, res) => {
    const idUsuario = Number(req.params.id)
    const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>
    await prisma.usuario.update({
        data: {
            ...dadosParaAtualizar
        },
        where: {
            id: idUsuario
        }
    })
    const usuarioAtualizado = await prisma.usuario.findUnique({
        where: {
            id: idUsuario
        }
    })
    return res.status(200).json(usuarioAtualizado)
})


usuarioRouter.delete('/usuarios/:id', async (req, res) => {
    const idUsuario = Number(req.params.id)
    const deletarUsuario = await prisma.usuario.delete({
        where: {
            id: idUsuario
        }
    })
    return res.status(200).json({
        message: "Usuário deletado com sucesso",
        data: deletarUsuario
    })
})