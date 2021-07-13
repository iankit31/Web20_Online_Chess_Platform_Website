import React,{useRef} from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import './index.css';
import {io} from 'socket.io-client'


const socket = io('http://localhost:3001');
socket.on('connect', ()=>{
  socket.on('recieve-message', message => {console.log(message)})
})
export default socket




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

