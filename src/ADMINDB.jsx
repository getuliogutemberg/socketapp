import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'; // npm install socket.io-client
import './ADMINDB.css';

const ADMINDB = () => {
  const socket = socketIOClient('http://localhost:5006')
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
        

          console.log(messages)
          messages === 'Nenhuma mensagem'?
          setMessagesOnDB([{message: 'Nenhuma mensagem'}]) 
          :  setMessagesOnDB([ ... messages ]);
        //   setProgress(100);
          
      });
  
      return () => {
          socket.disconnect();
      };
  }, []);
  return (
  <div className='MessagensOnDB ADMINDB'>
        <h1 className='title'>Gestão de mensagens do no DB:  </h1>
        <h3 className='subtitle'>{responseConnectAPISocket}</h3>
       
        <ul className='elements' >
        {messagesOnDB.map((message, index) => (
                <li className='text' key={index} > 
                    <span  >Mensagem: <input type="text" placeholder={message.message}  onChange={(e) =>  message.message = e.target.value}/></span>
                    <button onClick={() => socket.emit('deleteMessage', message._id)}>Excluir</button>
                    <button onClick={() => socket.emit('editMessage', {index: message._id, message: message.message})}>Editar</button>
                </li>
                ))}
        </ul>
    </div>
  )
}

export default ADMINDB