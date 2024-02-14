import React, { useEffect, useState } from 'react'
import axios from 'axios'; // npm install axios
import './Receptor.css';

const Receptor = () => {
  const [responseConnectAPI , setResponseConnectAPI] = useState('Servidor não conectado'); // useState para armazenar a resposta da API
  const [responseAPI , setResponseAPI] = useState('Receptor não conectado'); // useState para armazenar a resposta da API
  
  const [progress, setProgress] = useState(0);

    useEffect(() => {  
        const conectReceptor = () => {
          axios.get('http://localhost:5005') // URL da API
          .then((response) => { // Caso tenha sucesso
            setResponseConnectAPI('Conectado ao servidor com sucesso'); // Atualiza a resposta da API
            setTimeout(() => {
              setResponseConnectAPI('Receptor, ' + response.data)
              setResponseAPI('Receptor conectado');
            }, 2000); // Atualiza a resposta da API depois de 2 segundos
          })
          .catch((error) => { // Caso ocorra um erro
            console.log(error); // Exibe o erro
          });
        }

        conectReceptor()
        
        
      },[])// useEffect para executar a chamada da API apenas uma vez

      useEffect(() => {
        const getLastMessage = () => {
          axios.get('http://localhost:5005/last') // URL da API endpoint para pegar a ultima mensagem
          .then((response) => { // Caso tenha sucesso
            setResponseAPI(response.data); // Atualiza a resposta da API
            setProgress(100); // Quando a solicitação é bem-sucedida, define o progresso como 100%
            
          
          })
          .catch((error) => { // Caso ocorra um erro
            console.log(error); // Exibe o erro
          });
        }
        
        const interval = setInterval( () => {
          
         responseConnectAPI === 'Receptor, Bem-vindo ao meu servidor backend em Node.js!' && getLastMessage()
         }, 5000 ) // Atualiza a resposta da API a cada 5 segundosgetLastMessage()

        return () => clearInterval(interval)
      },[responseConnectAPI])

      useEffect(()=>{
        const interval = setInterval( () => {
          progress >= 100 ? setProgress(0) : responseConnectAPI === 'Receptor, Bem-vindo ao meu servidor backend em Node.js!' ? setProgress(progress + 0.1) : setProgress(0)
         }, 4 )

        return () => clearInterval(interval)
      },[progress, responseConnectAPI])

  return (
    <div className='Receptor'>
        <h1>Receptor</h1>
        <p>{responseConnectAPI}</p>
        <p>{responseAPI}</p>
        
        <div style={{ width: '100%', backgroundColor: '#f0f0f0' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '10px',
                backgroundColor: '#007bff',
              }}
            />
          </div>
        
    </div> // Retorna a resposta da API
  )
}

export default Receptor