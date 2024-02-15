import React, { useState } from 'react';
import ReactComponente from './ReactComponente'; 
import './App.css';
import Receptor from './Receptor';
import Transmissor from './Transmissor';
import ReceptorSockets from './ReceptorSockets';
import MessagensOnServer from './MessagensOnServer';
import MessagensOnDB from './MessagensOnDB';
import ADMINDB from './ADMINDB';

// import TransmissorSockets from './TransmissorSockets';


function App() {
  const [showHttp, setShowHttp] = useState( true );
  const [showSockets, setShowSockets] = useState( true );
  
  return <div className="App">
     <h1 className='title'>Aplicação de exemplo</h1>
     <ReactComponente />
     <div className='conteudo'>

     
     <div className='Conexões'>

     <h1>Conexões</h1>
     <div className='metodos'>

     <div className='HTTP'>
     <h2 onClick={() => setShowHttp(!showHttp)}>Conexão HTTP: </h2>
     {showHttp && <div className='conexao'>
     <Receptor/>
     <Transmissor />
     </div>}

     </div>

     <div className='SOCKETS'>
     <h2 onClick={() => setShowSockets(!showSockets)}>Conexão Sockets: </h2>
     {showSockets && <div className='conexao'>
     <ReceptorSockets/>
     <Transmissor />
     {/* <TransmissorSockets /> */}
     </div>}

     </div>
     </div>
     </div>

     <div className='persistencia'>
     <h1>Dados persistidos</h1>
     <div className='dados'>
      <MessagensOnServer />
      <MessagensOnDB />
     </div>
     </div>
     <div className='persistencia'>
     <h1>Gestão de dados</h1>
     <div className='dados'>
      
      <ADMINDB />
     </div>
     </div>
     </div>
   </div>
 
}
export default App;
