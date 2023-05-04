import express from "express";
import db from "./config/dbconnect.js";
import livros from "./models/Livro.js"

db.on("erro", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log("Conexão com banco feita com sucesso.")
})

const app = express()

app.use(express.json())

// const livros = [
//     {id: 1, "titulo" : "Robbit"},
//     {id: 2, "titulo" : "Senhor dos Aneis"}
// ]

app.get('/', (req,res) => {
    res.send("Sevidor ON")
})

app.get('/livros', async (req,res) => {
    try{
        const livrosResultado = await livros.find();
        res.status(200).json(livrosResultado)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.get('/livros/:id', (req,res) => {
    let index = buscaLivro(req.params.id);
    res.json(livros[index])
})

app.post('/livros', (req,res) => {
    livros.push(req.body)
    res.status(200).send('Livro criado com sucesso.')
})


app.put('/livros/:id', (req,res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo
    res.json(livros)
})

app.delete('/livros/:id', (req,res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1)
    res.send(`Livro ${id} removido com sucesso`)
})


function buscaLivro(id) {
    //Metodo findeIndex() -> Pra cada elemento do array vai retornar o id do array livro com base no id que for inserido no parametro
    return livros.findIndex(livro => livro.id == id)
}

export default app