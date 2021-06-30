import React from 'react';
import ReactDOM from 'react-dom';
import FrontPart from "./Components/FrontPart"
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="text-center">
      <FrontPart/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);