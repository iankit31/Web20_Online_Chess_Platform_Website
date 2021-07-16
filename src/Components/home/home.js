import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

export default function home() {
    const historyRouter = useHistory();
    const [playerName,setPlayerName] = useState("")
    const [gameCode,setGameCode] = useState("")

    const handleSubmit = (e) => {
		e.preventDefault();
		historyRouter.push(`/${gameCode}`);
	};

    return (
        <div className="homepage">
            <h1 id="heading">Welcome to the Online ChessGame!</h1>
            <div className="form">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <label>
                        Player Name:
                        <input type="text" value={playerName} placeholder="Enter Your Name" onChange={(e)=>{setPlayerName(e.target.value)}} />
                    </label>
                    <label>
                        Game Code:
                        <input type="text" value={gameCode}  placeholder="Enter game code"onChange={(e)=>{setGameCode(e.target.value)}} />
                    </label>
                    <input type="submit" value="Submit" />
                 </form>
            </div>
        </div>
    )
}
