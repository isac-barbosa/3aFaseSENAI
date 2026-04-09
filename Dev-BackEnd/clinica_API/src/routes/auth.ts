import { Router } from "express";
import { createHash } from "../utils/createHash";
import { prisma } from "../prisma/prisma";
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt";
import bcrypt from "bcrypt";
import type { Usuario } from "../prisma/generated/prisma/client";

export const authRouter = Router();

authRouter.post("/cadastro", async (req, res) => {
    const dadosUsuario = req.body as Usuario
    const hash = await createHash(dadosUsuario.senha);
    const usuarioCriado = await prisma.usuario.create({
        data: {
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null,
            senha: hash
        }
    })
    return res.status(201).json({
        message: "Usuário criado com sucesso!",
        data: usuarioCriado
    })
})

authRouter.post("/login", async (req, res) => {
    const dadosUsuario = req.body as Partial<Usuario>
    const existeUsuario = await prisma.usuario.findUnique({
        where: {
            email: dadosUsuario.email || '',
        }
    })
    const credenciaisValidas = await bcrypt.compare(dadosUsuario.senha || "", existeUsuario?.senha || "")

    if (existeUsuario && credenciaisValidas) {
        const tokenAcesso = signTokenAcesso({
            email: existeUsuario.email,
            nome: existeUsuario.nome
        })
        const tokenRefresh = signTokenRefresh({
            email: existeUsuario.email,
            nome: existeUsuario.nome
        })

        const accessExpires = new Date()
        const accessExpiresUpdate = accessExpires.setHours(accessExpires.getHours() + 1)
        // acesso create
        await prisma.token.create({
            data: {
                token: tokenAcesso,
                expiresAt: new Date(accessExpiresUpdate),
                type: 'ACCESS',
                usuarioId: existeUsuario.id
            }
        })

        //refresh create
        const refreshExpires = new Date()
        const refreshExpiresUpdated = refreshExpires.setMonth(refreshExpires.getMonth() + 1)

        await prisma.token.create({
            data: {
                token: tokenRefresh,
                expiresAt: new Date(refreshExpiresUpdated),
                type: 'REFRESH',
                usuarioId: existeUsuario.id
            }
        })

        return res.status(200).json({
            message: "Usuário autenticado com sucesso!",
            accessToken: tokenAcesso,
            refreshToken: tokenRefresh
        })
    }

    return res.status(401).json({
        message: "Credenciais inválidas"
    })

})