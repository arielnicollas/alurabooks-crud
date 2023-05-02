import express from "express";

const app = express()

app.use(express.json())

const livros = [
    {id: 1, "titulo" : "Robbit"},
    {id: 2, "titulo" : "Senhor dos Aneis"}
]

app.get('/', (req,res) => {
    res.send("Sevidor ON")
})

app.get('/livros', (req,res) => {
    res.status(200).send(livros)
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


function buscaLivro(id) {
    //Metodo findeIndex() -> Pra cada elemento do array vai retornar o id do array livro com base no id que for inserido no parametro
    return livros.findIndex(livro => livro.id == id)
}

export default app