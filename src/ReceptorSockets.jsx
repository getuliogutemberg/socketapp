import React, { useEffect, useState } from 'react'
// import axios from 'axios'; // npm install axios
import socketIOClient from 'socket.io-client'; // npm install socket.io-client
import './ReceptorSockets.css';



const ReceptorSockets = () => {
  const [responseConnectAPISocket , setResponseConnectAPISocket] = useState('Servidor Socket não conectado');
  const [responseAPISocket , setResponseAPISocket] = useState({message:'Receptor não conectado ao servidor de sockets'});
  const [progress, setProgress] = useState(0);
  
  
  useEffect(() => {
    const socket = socketIOClient('http://localhost:5006') // URL do servidor
    
    
    socket.on('connect', () => {
        setResponseConnectAPISocket('Conectado ao servidor de sockets com sucesso');
        
    });

    socket.on('initialMessage', (message) => {
        setResponseConnectAPISocket(message);
        setProgress(0);
    });

    socket.on('newMessage', (messages) => {
        // messages contém todas as mensagens, você precisa processá-las conforme necessário
        // Aqui, assumindo que messages é uma matriz de objetos com propriedade 'message'
        console.log(messages);
        const lastMessage = messages === 'Nenhuma mensagem' || messages.length === 0 ? {message: 'Nenhuma mensagem'} : messages[messages.length - 1];
        setResponseAPISocket({message:lastMessage.message});
        setProgress(100);
        
    });

    return () => {
        socket.disconnect();
    };
}, []);

return (
  <div className='ReceptorSockets'>
      <h1>Receptor</h1>
      <p>{responseConnectAPISocket}</p>
      <p>{responseAPISocket && responseAPISocket.message}</p>
      
      <div style={{ width: '100%', backgroundColor: '#f0f0f0' }}>
          <div
              style={{
                  width: `${progress}%`,
                  height: '10px',
                  backgroundColor: '#007bff',
              }}
          />
      </div>
  </div>
)
  }

export default ReceptorSockets