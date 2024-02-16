import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'; // npm install socket.io-client
import './MessagensOnServer.css';
import { TbMessages } from "react-icons/tb";
const MessagensOnServer = () => {
    const [responseConnectAPISocket , setResponseConnectAPISocket] = useState('Servidor Socket não conectado');
    const [messagesOnServer, setMessagesOnServer] = useState([{
        message: 'Nenhuma mensagem'
    }]);
    // const [progress, setProgress] = useState(0);
    
    
    useEffect(() => {
      const socket = socketIOClient('http://localhost:5006') // URL do servidor
      
      
      socket.on('connect', () => {
          setResponseConnectAPISocket('Conectado ao servidor de sockets com sucesso');
          
      });
  
      socket.on('initialMessage', (message) => {
          setResponseConnectAPISocket(message);
        //   setProgress(0);
      });
  
      socket.on('newMessage', (messages) => {
        

          console.log(messages)
          messages === 'Nenhuma mensagem' ? setMessagesOnServer([{message: 'Nenhuma mensagem'}]) : setMessagesOnServer([ ... messages ]);
        //   setProgress(100);
          
      });
  
      return () => {
          socket.disconnect();
      };
  }, []);
  return (
    <div className='MessagensOnServer'>
        <h1 className='title'><TbMessages size={30} /> Mensagens no servidor:  </h1>
        <h3 className='subtitle'>{responseConnectAPISocket}</h3>
       
        <ul className='list' >
        {messagesOnServer.map((message, index) => (
                <li className='text' key={index}> Mensagem n° {index + 1}: {message.message}</li>
                ))}
        </ul>
    </div>
  )
}

export default MessagensOnServer