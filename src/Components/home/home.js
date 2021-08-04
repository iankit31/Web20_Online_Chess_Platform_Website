import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import "./home.css"


export default function Home() {
    const historyRouter = useHistory();
    const [playerName,setPlayerName] = useState("")
    const [gameCode,setGameCode] = useState("")

    const handleSubmit = (e) => {
		e.preventDefault();
		historyRouter.push(`/chess/${gameCode}`);
	};

    return (
        <div className="homepage">
            <h1 id="welcome-text">Welcome to the Online ChessGame!</h1>
            
            <div className="form">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="form-label">
                        <label>
                            Player Name: 	&nbsp; &nbsp;
                            <input className="form-input" type="text" value={playerName} placeholder="Enter Your Name" onChange={(e)=>{setPlayerName(e.target.value)}} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            Room Code: 	&nbsp; &nbsp;
                            <input className="form-input" type="text" value={gameCode}  placeholder="Enter Room code"onChange={(e)=>{setGameCode(e.target.value)}} />
                        </label>
                    </div>
                    <br />
                    <input className="submit-btn" type="submit" value="Start Game" />
                 </form>
            </div>
            <div style={{fontSize:23}}>
                If you are a new user, &nbsp;
                <button className="submit-btn" onClick={(e) => { e.preventDefault();   historyRouter.push(`/register`);
                    }}>Register Here</button>
            </div>    
        </div>
    )
}
