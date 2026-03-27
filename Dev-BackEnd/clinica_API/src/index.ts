import express from 'express';
import { prisma } from './prisma/prisma';
import type { Exame, Usuario, TypeToken } from './prisma/generated/prisma/client';
import { createHash } from './utils/createHash';
import bcrypt from "bcryptjs"
import { signTokenAcesso, signTokenRefresh } from './utils/jwt';
import { auth } from './middleware/auth';

const app = express();
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})
//Endpoints cadastro
app.post("/cadastro", async (req, res) => {
  console.log(req.body)
  const dadosUsuario = req.body as Usuario
  const hash = await createHash(dadosUsuario.senha);
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null,
      senha: hash
    }
  })
  return res.status(201).json(usuarioCriado)
})


//Endpoint Login
app.post("/login", async (req, res) => {
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

app.use(auth)

// Endpoints usuario
app.get('/usuarios', async (_, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
})

app.get('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  })
  return res.status(200).json(usuario)
})

app.post("/usuarios", async (req, res) => {
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



app.put('/usuarios/:id', async (req, res) => {
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


app.delete('/usuarios/:id', async (req, res) => {
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


//Exames
app.get('/exame', async (req, res) => {
  const exames = await prisma.exame.findMany()
  res.json(exames)
})


app.post('/exame', async (req, res) => {
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
app.get('/exame/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where:{
      id: idExame
    }
  })
    return res.status(200).json(exame)
})

app.put('/exame/:id', async (req, res) => {
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


app.delete('/exame/:id', async (req, res) => {
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



app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})