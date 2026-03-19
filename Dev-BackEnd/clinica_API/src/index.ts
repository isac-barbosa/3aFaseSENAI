import express from 'express';
import { prisma } from './prisma/prisma';
import type { Exame, Usuario } from './prisma/generated/prisma/client';

const app = express();
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

// Endpoints usuario
app.get('/usuarios', async (req, res) => {
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
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null
    }
  })
  return res.status(201).json(usuarioCriado)
})



app.put('/usuarios', async (req, res) => {
  const idUsuario = Number(req.params)
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
  return res.status(201).json(usuarioAtualizado)
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
app.get('/exame/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where: {
      id: idExame
    }
  })
  return res.status(200).json(exame)
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