import React from "react"
import Chessboard from "./Components/chessboard/chessboard"
import Home from "./Components/home/home"
import './App.css'

import Loginform from './Components/Loginform/Loginform'
import AccessDenied from "./Components/AccessDenied/AccessDenied"

import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
function App(){
    
    return(
        <Router>
			<Switch>
				<Route  exact path="/">
					<Redirect to="/login" />
				</Route>

				<Route path="/login">
					<Loginform/>
				</Route>
				
				<Route  exact path="/chessgame">
					<Home/>
				</Route>

 				<Route path="/chess/:roomId" >
                    <div className="container">
                        <Chessboard />
                     </div> 
				</Route>
				
				<Route path="/*">
					<AccessDenied/>
				</Route>
			</Switch>
		</Router>

       
    )
}

export default App
