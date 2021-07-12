import React,{useRef} from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import './index.css';
import {io} from 'socket.io-client'

// const socket = io('http://localhost:3001');


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

