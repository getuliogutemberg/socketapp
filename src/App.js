import React, { useEffect, useState } from 'react';
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
  const [showName, setShowName] = useState( true );
  useEffect(() => {
    setTimeout(() => {
      setShowName(false)
    },3000)
  },[])
  
  return <div className="App">
     <h1 className={`appName ${!showName&&'hide'}`} >Do zero ao socket:</h1>
     {/* <ReactComponente /> */}
     <div className='conteudo'>

     
     <div className='Conexões'>
    
     <h1><HiMiniComputerDesktop size={30} /> FrontEnd</h1>
   <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/640px-React_Logo_SVG.svg.png" alt="react" />

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
     <img className='logo' src="https://lofrev.net/wp-content/photos/2017/04/http_logo_dpwnload.png" alt="http" />

     </div>
     <div className='connect'>
     <FaArrowRightLong />
     <PiArrowsCounterClockwiseFill />
     <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1200px-Socket-io.svg.png" alt="socket" />

     </div>
     <div className='persistencia'>
     <h1><CiServer size={30} /> BackEnd</h1>
     <img className='logo' src="https://miro.medium.com/v2/resize:fit:800/1*v2vdfKqD4MtmTSgNP0o5cg.png" alt="node" />
     <div className='dados'>
      <MessagensOnServer />
      <PiArrowFatLinesDownBold size={30}/>
      <MessagensOnDB />
     </div>
     
     </div>
     <div className='connect'>
     <FaArrowRightLong />
     <FaArrowLeftLong />
     <img className='logo' src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkFoM1%2Fbtq0obgDeiK%2FzUs1169JPSexW9cW4Joy50%2Fimg.png" alt="mongoose" />
     </div>
     <div className='persistencia'>

     <h1><BsDatabaseLock  size={30}/> Banco de Dados</h1>
    <img className='logo' src="https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png" alt="mongo" />

     <div className='dados'>
      
      <ADMINDB />
     </div>
     </div>
     </div>
   </div>
 
}
export default App;
