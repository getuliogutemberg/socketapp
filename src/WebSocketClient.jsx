import React, { useEffect, useState } from 'react';

function WebSocketClient() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [localMessages, setLocalMessages] = useState([]);

  useEffect(() => {
    // Estabelecer conexão com o servidor WebSocket
    const ws = new WebSocket('ws://localhost:8080');

    // Manipulador de eventos para quando a conexão é aberta
    ws.onopen = () => {
      setSocket(ws);
      console.log('Conexão estabelecida com o servidor WebSocket.' );
      // addLocalMessage('Conexão estabelecida com o servidor WebSocket.');
    };

    // Manipulador de eventos para mensagens recebidas do servidor
    ws.onmessage = (event) => {
      console.log('Mensagem recebida do servidor:', event.data);
      // addLocalMessage(`Mensagem recebida do servidor: ${event.data}`);
      setReceivedMessages(prevMessages => [...prevMessages, event.data]);
      setLocalMessages(localMessages => [...localMessages, event.data]);
    };

    // // Recuperar mensagens locais do armazenamento local ao montar o componente
    // const localMessagesRecovery =  JSON.parse(localStorage.getItem('messages')) || [];
    // console.log(localMessagesRecovery)
    // setLocalMessages(localMessagesRecovery);

    // Função de limpeza para fechar a conexão quando o componente for desmontado
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Função para lidar com o envio de mensagem para o servidor
  const sendMessage = (content) => {
    if (socket) {
      socket.send(content);
      // setMessage('');
    }
  };

  // Função para adicionar mensagem local e salvar no armazenamento local
  const addLocalMessage = (message) => {
    console.log(localMessages)
    console.log(message)
    setLocalMessages([...localMessages, message ]);
    localStorage.setItem('messages', JSON.stringify(localMessages));
  };

  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  const [action, setAction] = useState('create');
  const [type , setType] = useState('message');

  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [photo , setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'message') {
      const messageData = {
        action: action,
        type: type,
        sender: sender,
        recipient: recipient,
        content: content
      };
      // Aqui você pode enviar a mensagem para o servidor, por exemplo, usando WebSocket ou fazendo uma solicitação HTTP
      console.log('Enviando mensagem:', messageData);
      setMessage(JSON.stringify(messageData));
      // Limpar campos após o envio
      setSender('');
      setRecipient('');
      setContent('');
      sendMessage(JSON.stringify(messageData));
     
    }
    if (type === 'user') {
      const userData = {
        action: action,
        type: type,
        username: username,
        email: email,
        password: password,
        photo: photo
      };
      // Aqui você pode enviar a mensagem para o servidor, por exemplo, usando WebSocket ou fazendo uma solicitação HTTP
      console.log('Enviando mensagem:', userData);
      setMessage(JSON.stringify(userData));
      // Limpar campos após o envio
      setUsername('');
      setEmail('');
      setPassword('');
      setPhoto('');
      sendMessage(JSON.stringify(userData));
    }
    if (type === 'log') {
      const logData = {
        action: action,
        type: type,
        message: content
      };
      // Aqui você pode enviar a mensagem para o servidor, por exemplo, usando WebSocket ou fazendo uma solicitação HTTP
      console.log('Enviando mensagem:', logData);
      setMessage(JSON.stringify(logData));
      // Limpar campos após o envio
      setContent('');
      sendMessage(JSON.stringify(logData));
    }
    
  };

  return (
    <div>
      <h1>WebSocket Client</h1>

      <form onSubmit={handleSubmit}>

      <div>
        <label>Acão:</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="create">Criar</option>
          <option value="update">Atualizar</option>
          <option value="delete">Excluir</option>
        </select>
      </div>

      <div>
        <label>Tipo:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="message">Mensagem</option>
          <option value="user">Usuário</option>
          <option value="log">Log</option>
        </select>
      </div>

      {type === 'message' && <>
      <div>
        <label>Remetente:</label>
        <input 
          type="text" 
          value={sender} 
          onChange={(e) => setSender(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Destinatário:</label>
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Conteúdo:</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      
      </>}
      {type === 'user' && <>
      <div>
        <label>Nome:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Senha:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>foto:</label>
        <textarea 
          value={photo} 
          onChange={(e) => setPhoto(e.target.value)} 
          required 
        />
      </div>
      </>}
      {type === 'log' && <>
      <div>
        <label>Conteúdo:</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      </>}
      {message}

      <button type="submit">{action === 'create' ? 'Criar' : 'Atualizar'} {type === 'message' ? 'Mensagem' : type === 'user' ? 'Usuário' : 'Log' }</button>

    </form>

      {/* <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />


      <button onClick={sendMessage}>Enviar Mensagem</button> */}
      <h2>Mensagens Recebidas do Servidor:</h2>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h2>Mensagens Locais:</h2>
      <ul>
        {localMessages.map((msg, index) => (
          
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocketClient;


