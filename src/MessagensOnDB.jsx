import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'; // npm install socket.io-client
import './MessagensOnDB.css';

const MessagensOnDB = () => {
    const [responseConnectAPISocket , setResponseConnectAPISocket] = useState('Servidor Socket não conectado');
    const [messagesOnDB, setMessagesOnDB] = useState([{
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
  
      socket.on('getAllMessagesOnDB', (messages) => {
        

          
          messages === 'Nenhuma mensagem' ? setMessagesOnDB([{message: 'Nenhuma mensagem'}]) : setMessagesOnDB([...messages]);
        //   setProgress(100);
          
      });
  
      return () => {
          socket.disconnect();
      };
  }, []);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5006') // URL do servidor
    

    socket.on('NewMessage', () => {
        socket.on('getAllMessagesOnDB', (messages) => {
        

          
            messages === 'Nenhuma mensagem' ? setMessagesOnDB([{message: 'Nenhuma mensagem'}]) : setMessagesOnDB([...messages]);
          //   setProgress(100);
            
        });
    })

  }, [])
  return (
    <div className='MessagensOnDB'>
        <h1 className='title'>Mensagens no banco de dados:  </h1>
        <h3 className='subtitle'>{responseConnectAPISocket}</h3>
       
        <ul className='list'>
            {messagesOnDB.map((message, index) => (
                <li className='text' key={index}> Mensagem n° {index + 1}: {message.message}</li>
            ))}
        </ul>
    </div>
  )

}

export default MessagensOnDB