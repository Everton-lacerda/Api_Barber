import express from 'express'

const app = express();

app.get('/', (req, res) => {
    return res.json({message: 'Funcionando'})
})

app.listen(3333, () => {
    console.log('Server starter on port 3333!')
})