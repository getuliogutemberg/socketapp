const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Porta onde o servidor irá escutar
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Bem-vindo ao meu servidor backend em Node.js!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

