import React from "react"
import Chessboard from "./Components/chessboard/chessboard"
import MessageBox from "./Components/messagebox/messagebox"
import Home from "./Components/home/home"
import './App.css'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App(){
    
    return(
        <Router>
			<Switch>
				<Route path="/" exact>
					<Home/>
				</Route>
 				<Route path="/:roomId" >
                    <div className="container">
                        {/* <MessageBox />  */}
                        <Chessboard />
                     </div> 
				</Route>
			</Switch>
		</Router>

       
    )
}

export default App
