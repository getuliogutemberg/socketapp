const express = require('express');
const HTTPPORT = process.env.HTTPPORT || 5005; // Porta onde o servidor HTTP irá escutar
const SOCKETPORT = process.env.SOCKETPORT || 5006; // Porta onde o servidor WebSocket irá escutar
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http'); // Importa o modulo http
const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app); // Cria o servidor
const io = socketIo(server,{
    cors: {
      origin: 'http://localhost:4000',
      methods: ['GET', 'POST'],
    },
  }); // Cria o servidor WebSocket 

let messages = [];

app.get('/', (req, res) => {
    
    res.send('Bem-vindo ao meu servidor backend em Node.js!');
});

app.post('/', (req, res) => {
    console.log(req.body.message);

    messages.push( {
        message: req.body.message
    });
    
    res.send({
        message: 'Mensagem recebida: ' + req.body.message,
    });

    io.emit('newMessage', messages); // Emita a mensagem atualizada para todos os clientes conectados
   
});

app.get('/last', (req, res) => {
    // console.log(messages[messages.length - 1].message);
    messages.length > 0 ? res.send('Ultima mensagem: ' +  messages[messages.length - 1].message)
    : res.send('Nenhuma mensagem');
});


io.on('connection', (socket) => {
    console.log('Conectado!' + socket.id);
    socket.emit('initialMessage', 'Conectado ao servidor de sockets com sucesso');
    socket.emit('newMessage', messages.length > 0 ? messages : 'Nenhuma mensagem'); // Envie as mensagens existentes quando um cliente se conectar

    socket.on('sendMessage', (message) => {
        console.log('Nova mensagem recebida:', message);
        messages.push({ message });
        io.emit('newMessage', messages); // Emita a mensagem atualizada para todos os clientes conectados
    });

    // Lógica de desconexão do cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


});

app.listen(HTTPPORT, () => {
    console.log(`Http rodando na porta ${HTTPPORT}`);
});

server.listen(SOCKETPORT, () => {
    console.log(`Sockets rodando na porta ${SOCKETPORT}`);
});

