import React from "react"
import Chessboard from "./Components/chessboard/chessboard"
import MessageBox from "./Components/messagebox/messagebox"
import './App.css'

function App(){
    
    return(
        <div className="container">
            <MessageBox />
            <Chessboard />
        </div>
    )
}

export default App
