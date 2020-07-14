import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Funcionando' }));

app.listen(3333, () => {
  console.log('Server starter on port 3333!');
});
