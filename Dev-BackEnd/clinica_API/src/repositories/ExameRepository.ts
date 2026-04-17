import type { PrismaClient } from "@prisma/client/extension";
import type { Exame } from "../prisma/generated/prisma/client";

export class ExameRepository {
    constructor(private readonly prisma: PrismaClient) {
         this.prisma = prisma
    }
    async criarExame(dadosExame: Partial<Exame>) {
        return await this.prisma.exame.create({
            data: {
            tipo_exame: dadosExame.tipo_exame,
            valor: dadosExame.valor,
            descricao: dadosExame.descricao,
            resultado: dadosExame.resultado,
            data_exame: new Date(dadosExame.data_exame || "")
        }
        })
    }
    async buscarExame(){
        const exame = await prisma.exame.findMany()

    }
}