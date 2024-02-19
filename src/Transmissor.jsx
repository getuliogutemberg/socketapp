import React, { useEffect, useState } from 'react'
import axios from 'axios'; // npm install axios
import './Transmissor.css';
import { RiUserVoiceLine } from "react-icons/ri";
const Transmissor = () => {
    const [responseAPI , setResponseAPI] = useState('Transmissor não conectado'); // useState para armazenar a resposta da API
    const [message , setMessage] = useState(''); // useState para armazenar a mensagen para ser enviada para a API
    
    useEffect(() => {  
        axios.get('http://localhost:5050') // URL da API
        .then((response) => { // Caso tenha sucesso
          setResponseAPI('Conectado transmissor'); // Atualiza a resposta da API
          setTimeout(() => setResponseAPI('Transmissor, ' + response.data), 2000); // Atualiza a resposta da API depois de 2 segundos
        })
        .catch((error) => { // Caso ocorra um erro
          console.log(error); // Exibe o erro
        });
        
      },[])// useEffect para executar a chamada da API apenas uma vez

    const sendMessage = () => {
        axios.post('http://localhost:5050' , { message: message } ) // URL da API
        .then((response) => { // Caso tenha sucesso
          setResponseAPI(response.data.message); // Atualiza a resposta da API

        })
        .catch((error) => { // Caso ocorra um erro
          console.log(error); // Exibe o erro
        });
    }
    
  return (
    <div className='Transmissor'> 
        <h2><RiUserVoiceLine  size={30}/> Transmissor</h2>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => setMessage('')}>Limpar</button>
        <button onClick={() => sendMessage()}>Enviar</button>
        <br/>
        <p>{responseAPI}</p>
        
    </div>
  )
}

export default Transmissor