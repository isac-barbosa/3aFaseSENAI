import type { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../prisma/prisma";
import type { Usuario } from "../prisma/generated/prisma/client";

export class UsuarioRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }
    async buscarUser(dadosUsuario: Partial<Usuario>){
        const usuarios = await prisma.usuario.findMany()
        await this.prisma.usuario.get({
        })
        return(usuarios)
    }

    async buscarUserId(idUsuario: number){
        const usuario = await prisma.usuario.findUnique({
            where:{
                id: idUsuario
            }
        })
        return usuario
    }


    async atualizarUser() {
        const idUsuario = Number(this.prisma.id)
        const dadosParaAtualizar = prisma.usuario as Partial<Usuario>
        await this.prisma.usuario.update({
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
        return usuarioAtualizado
    }
    async deleteUser() {
        const idUsuario = Number(this.prisma.id)
        return await prisma.usuario.delete({
            where: {
                id: idUsuario
            }
        })
    }
}