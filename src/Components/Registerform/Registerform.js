import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

export default function Registerform() {
    const historyRouter = useHistory();
    const [playerName,setPlayerName] = useState("")
    const [playerId,setPlayerId] = useState("")
    const [playerEmailId,setPlayerEmailId] = useState("")
    const [playerPassword,setPlayerPassword] = useState("")

    const handleRegister = (e) => {
		e.preventDefault();
		// historyRouter.push(`/createuser`);
	};

    return (
        
        <div>
        
        <h1 id="welcome-text">New User Register Here</h1>

        <div className="form">
                <form onSubmit={(e)=>handleRegister(e)}>
                    <div className="form-label">
                        <label>
                            Player Name: 	&nbsp; &nbsp;
                            <input className="form-input" type="text" value={playerName} placeholder="Enter Your Name" onChange={(e)=>{setPlayerName(e.target.value)}} />
                        </label>
                    </div>
                    <br/>
                    <div className="form-label">
                        <label>
                            Player Id: 	&nbsp; &nbsp;
                            <input className="form-input" type="text" value={playerId} placeholder="Enter Your unique userId" onChange={(e)=>{setPlayerId(e.target.value)}} />
                        </label>
                    </div>                    
                    <br/>
                    <div className="form-label">
                        <label>
                            Email Id: 	&nbsp; &nbsp;
                            <input className="form-input" type="email" value={playerEmailId} placeholder="Enter Your Email Id" onChange={(e)=>{setPlayerEmailId(e.target.value)}} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            Password: 	&nbsp; &nbsp;
                            <input className="form-input" type="password" value={playerPassword}  placeholder="Enter password"onChange={(e)=>{setPlayerPassword(e.target.value)}} />
                        </label>
                    </div>
                    <br />
                    <input className="submit-btn" type="submit" value="Register User" />
                 </form>
       </div>
       </div>
    )
}