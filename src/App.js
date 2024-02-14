import React, { useState } from 'react';
import ReactComponente from './ReactComponente'; 
import './App.css';
import Receptor from './Receptor';
import Transmissor from './Transmissor';
import ReceptorSockets from './ReceptorSockets';
import TransmissorSockets from './TransmissorSockets';


function App() {
  const [showHttp, setShowHttp] = useState( true );
  const [showSockets, setShowSockets] = useState( true );
  
  return <div className="App">
     Hello React
     <ReactComponente />
     <div className='Conexões'>

     <h1>Conexões</h1>
     <div className='metodos'>

     <div className='HTTP'>
     <h2 onClick={() => setShowHttp(!showHttp)}>Conexão HTTP: </h2>
     {showHttp && <>
     <Receptor/>
     <Transmissor />
     </>}

     </div>

     <div className='SOCKETS'>
     <h2 onClick={() => setShowSockets(!showSockets)}>Conexão Sockets: </h2>
     {showSockets && <>
     <ReceptorSockets/>
     <Transmissor />
     {/* <TransmissorSockets /> */}
     </>}

     </div>
     </div>
     </div>
   </div>
 
}
export default App;
