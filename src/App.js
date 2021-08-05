import React from "react"
import Chessboard from "./Components/chessboard/chessboard"
import MessageBox from "./Components/messagebox/messagebox"
import Home from "./Components/home/home"
import './App.css'
import Registerform from './Components/Registerform/Registerform'
import Loginform from './Components/Loginform/Loginform'

import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
function App(){
    
    return(
        <Router>
			<Switch>
				<Route  exact path="/">
					<Redirect to="/login" />
				</Route>

				<Route path="/register">
					<Registerform/>
				</Route>

				<Route path="/login">
					<Loginform/>
				</Route>
				
				<Route  exact path="/chessgame">
					<Home/>
				</Route>

 				<Route path="/chess/:roomId" >
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
