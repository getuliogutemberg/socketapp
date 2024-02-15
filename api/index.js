const express = require('express');
const HTTPPORT = process.env.HTTPPORT || 5005; // Porta onde o servidor HTTP irá escutar
const SOCKETPORT = process.env.SOCKETPORT || 5006; // Porta onde o servidor WebSocket irá escutar
const cors = require('cors');
const mongoose = require('mongoose');
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
let messagesOnDB = [];

mongoose.connect('mongodb://localhost:27017/HelloMongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});

const messageSchema = new mongoose.Schema({
    message: String
});

const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
    
    res.send('Bem-vindo ao meu servidor backend em Node.js!');
});

app.post('/', async (req, res) => {
    // console.log(req.body.message);

    Message.create({
        message: req.body.message
    });

    messages.push( {
        message: req.body.message
    });
    
    res.send({
        message: 'Mensagem recebida: ' + req.body.message,
    });

    io.emit('newMessage', messages); // Emita a mensagem atualizada para todos os clientes conectados
    io.emit('getAllMessagesOnDB', await Message.find() );
   
});

app.get('/last', (req, res) => {
    // console.log(messages[messages.length - 1].message);
    messages.length > 0 ? res.send('Ultima mensagem: ' +  messages[messages.length - 1].message)
    : res.send('Nenhuma mensagem');
});


io.on('connection', async (socket) => {
    console.log('Conectado!' + socket.id);
    socket.emit('initialMessage', 'Conectado ao servidor de sockets com sucesso');
    socket.emit('newMessage', messages.length > 0 ? messages : 'Nenhuma mensagem'); // Envie as mensagens existentes quando um cliente se conectar
    socket.emit('getAllMessagesOnDB', await Message.find() ) // Emita a mensagem atualizada para todos os clientes conectados

    socket.on('sendMessage',  async (message) => {
        console.log('Nova mensagem recebida:', message);
        Message.create({ message });
        messages.push({ message });
        io.emit('getAllMessagesOnDB', await Message.find() );
        io.emit('newMessage', messages);
    });

    socket.on('deleteMessage',  async (index) => {
        console.log('Mensagem deletada:', index);
        await Message.findOneAndDelete({ _id: index });
        messages = await Message.find()
        
        io.emit('newMessage', await Message.find());
        io.emit('getAllMessagesOnDB', await Message.find() );
    });

    socket.on('editMessage', async ({index, message}) => {
        await Message.findByIdAndUpdate({ _id: index }, { message: message });
        messages = await Message.find()
        io.emit('newMessage', await Message.find());
        io.emit('getAllMessagesOnDB', await Message.find() );
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

