import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import "./loginForm.css";
export default function Loginform() {
    // return (<h1>Hello</h1>)
    const historyRouter = useHistory();
    const [playerId,setPlayerId] = useState("")
    const [playerPassword,setPlayerPassword] = useState("")
    

    return (
        
        <div className="loginForm">
        <h1 id="welcome-text">Welcome to online chessgame</h1>
        <br/>
        <h1 id="welcome-text">Login Here</h1>

        <div className="form">
                <form method="POST" action="http://localhost:3002/users/login">
                    <div className="form-label">
                        <label>
                            User Id: 	&nbsp; &nbsp;
                            <input name="id" className="form-input" type="text" value={playerId} placeholder="Enter Your unique userId" onChange={(e)=>{setPlayerId(e.target.value)}} />
                        </label>
                    </div>                    
                    <br />
                    <div className="form-label">
                        <label>
                            Password: 	&nbsp; &nbsp;
                            <input name="password" className="form-input" type="password" value={playerPassword}  placeholder="Enter password"onChange={(e)=>{setPlayerPassword(e.target.value)}} />
                        </label>
                    </div>
                    <br />
                    <input className="submit-btn" type="submit" value="Login" />
                 </form>
       </div>
       
       <div id="regbtn">
                If you are a new user, &nbsp;
                <button className="submit-btn" onClick={(e) => { e.preventDefault();   historyRouter.push(`/register`);
                    }}>Register Here</button>
            </div> 
       </div>
    )
}