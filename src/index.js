import React,{useRef} from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import './index.css';
// import {io} from 'socket.io-client'

function displayMessage(message) {
  let elem = document.getElementById("message-box");
  console.log(elem);
  elem.innerHTML = message;
}

// const socket = io('http://localhost:3001');
// export default socket
// socket.on('connect', ()=>{
//   displayMessage(`You are connected with id ${socket.id}`)
//   socket.on('recieve-message', message => {displayMessage(message)})
// })




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

