import React, { useState } from 'react';
import ReactComponente from './ReactComponente'; 
import './App.css';
import Receptor from './Receptor';
import Transmissor from './Transmissor';
import ReceptorSockets from './ReceptorSockets';
import MessagensOnServer from './MessagensOnServer';
import MessagensOnDB from './MessagensOnDB';
import ADMINDB from './ADMINDB';
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { CiServer } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsDatabaseLock } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiArrowsCounterClockwiseFill } from "react-icons/pi";
import { PiArrowFatLinesDownBold } from "react-icons/pi";
// import TransmissorSockets from './TransmissorSockets';


function App() {
  const [showHttp, setShowHttp] = useState( true );
  const [showSockets, setShowSockets] = useState( true );
  
  return <div className="App">
     <h1 className='title'>Do zero ao socket</h1>
     <ReactComponente />
     <div className='conteudo'>

     
     <div className='Conexões'>

     <h1><HiMiniComputerDesktop size={30} /> FrontEnd</h1>
     <div className='metodos'>

     <div className='HTTP'>
     <h2 onClick={() => setShowHttp(!showHttp)}>Conexão HTTP: </h2>
     {showHttp && <div className='conexao'>
     <Receptor/>
     Http ➚ (🔄 5s ➘)
     <Transmissor />
     </div>}

     </div>

     <div className='SOCKETS'>
     <h2 onClick={() => setShowSockets(!showSockets)}>Conexão Sockets: </h2>
     {showSockets && <div className='conexao'>
     <ReceptorSockets/>
     sockets ↕
     <Transmissor />
     {/* <TransmissorSockets /> */}
     </div>}

     </div>
     </div>
     </div>
     <div className='connect'>
      
     <FaArrowRightLong />
     <FaArrowLeftLong />
     Http
     </div>
     <div className='connect'>
     <FaArrowRightLong />
     <PiArrowsCounterClockwiseFill />
     Sockets
     </div>
     <div className='persistencia'>
     <h1><CiServer size={30} /> BackEnd</h1>
     <div className='dados'>
      <MessagensOnServer />
      <PiArrowFatLinesDownBold size={30}/>
      <MessagensOnDB />
     </div>
     
     </div>
     <div className='connect'>
     <FaArrowRightLong />
     <FaArrowLeftLong />
     Orm(mongoose)
     </div>
     <div className='persistencia'>
     <h1><BsDatabaseLock  size={30}/> Banco de Dados</h1>
     <div className='dados'>
      
      <ADMINDB />
     </div>
     </div>
     </div>
   </div>
 
}
export default App;
