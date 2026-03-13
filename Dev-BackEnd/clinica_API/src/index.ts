import express from 'express'

const app = express();
app.use(express.json())
const port = 3000;

type Payload = usuarios{

}

app.get('/', (req, res) => {
    console.log(req)
    res.send("Hello world")
})

app.get('/user', async (req, res) => {
    const user = await prisma.user.findMany()
    res.json(user)
})


app.post("/user", async (req, res) => {
    console.log(req)
    const dadosUsuario = req.bodyas Usuario
    const usuarioCriado = await prisma.usuario.create({
        data: {
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null
        }
    })
     return res.status(201).json(usuarioCriado)
})

app.listen(port, () => {
    console.log("Servidor funcionando")
})