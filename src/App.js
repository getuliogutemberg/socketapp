import React, { useEffect, useState } from 'react';
import ReactComponente from './ReactComponente'; 
import './App.css';
import axios from 'axios';


function App() {
  const [responseAPI , setResponseAPI] = useState('Servidor não conectado');

  useEffect(() => {    
    axios.get('http://localhost:5000')
    .then((response) => {
      setResponseAPI('Conectado ao servidor com sucesso');
      setTimeout(() => setResponseAPI(response.data), 2000);
    })
    .catch((error) => {
      console.log(error);
    });
    
  },[])
  
  return <div className="App">
     Hello React
     <ReactComponente />
     {responseAPI}
     
   </div>
 
}
export default App;
