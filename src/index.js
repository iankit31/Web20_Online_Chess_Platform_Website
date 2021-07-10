import React,{useRef} from 'react';
import ReactDOM from 'react-dom';
import FrontPart from "./Components/FrontPart"
import './index.css';
import {io} from 'socket.io-client'

const socket = io('http://localhost:3001');


ReactDOM.render(
  <React.StrictMode>
    <div className="text-center">
      <FrontPart/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

