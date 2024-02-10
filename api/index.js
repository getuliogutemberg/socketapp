const WebSocket = require('ws');
const mongoose = require('mongoose');

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/chatDB');
const db = mongoose.connection;

// Definir esquemas e modelos para usuários, mensagens e logs
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  photo: String,
  // Outros campos...
});

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  content: String,
  // Outros campos...
});

const logSchema = new mongoose.Schema({
  message: String,
  // Outros campos...
});

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Log = mongoose.model('Log', logSchema);

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

wss.on('connection', function connection(ws) {
    
    const clientId = generateClientId();
    clients.set(clientId, ws);
    
    console.log('Nova conexão estabelecida.',clientId);

  ws.on('message', function incoming(message) {
    console.log('Mensagem recebida do cliente:', message);
    handleMessage(clientId, message);
  });

  ws.on('close', function() {
    console.log('Conexão fechada para o cliente:', clientId);
    clients.delete(clientId);
    notifyAllClientsExceptOne(clientId, 'Cliente desconectado: ' + clientId);
  });
});


function handleMessage(clientId, message) {
  const data = JSON.parse(message); // Parse the message = {"action":"create","type":"message","sender":"pessoaA","recipient":"pessoaB","content":"Mensagem aqui!"}
    // console.log(clientId,data.action);
    
  switch (data.action) {
    case 'create':
      if (data.type === 'message') {
        const newMessage = new Message({
          sender: data.sender,
          recipient: data.recipient,
          content: data.content,
        });
        newMessage.save()
          .then(() => {
            notifyAllClients('Nova mensagem criada.' + newMessage.content);
          })
          .catch(error => {
            console.error('Erro ao salvar mensagem:', error);
          });
      }
      if (data.type === 'user') {
        const newUser = new User({
          name: data.username,
          email: data.email,
          password: data.password,
          photo: data.photo
        });
        newUser.save()
          .then(() => {
            notifyAllClients('Novo usuário criado: ' + newUser.name);
          })
          .catch(error => {
            console.error('Erro ao salvar usuário:', error);
          });
      }
      if (data.type === 'log') {
        const newLog = new Log({
          message: data.message
        });
        newLog.save()
          .then(() => {
            notifyAllClients('Novo log criado: ' + newLog.message);
          })
          .catch(error => {
            console.error('Erro ao salvar log:', error);
          });
      }
      // Outros casos de criação para usuários, logs, etc.
      break;
    // Outros casos de ação...
    case 'update':
      
      // Outros casos de ação...
      break;
    case 'delete':
      // Outros casos de ação...
      break;
    default:
      console.log('Ação não reconhecida:', data.action);
  }
}

function notifyAllClients(message) {
  clients.forEach((client, clientId) => {
    client.send(message);
  });
}

function notifyAllClientsExceptOne(excludedClientId, message) {
  clients.forEach((client, clientId) => {
    if (clientId !== excludedClientId) {
      client.send(message);
    }
  });
}

function generateClientId() {
  return 'client_' + Math.random().toString(36).substr(2, 9);
}



