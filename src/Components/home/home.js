import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios"
import "./home.css"


export default function Home() {
  const historyRouter = useHistory();
  const [playerName, setPlayerName] = useState("")
  const [gameCode, setGameCode] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    historyRouter.push(`/chess/${gameCode}`);
  };
  const [user, setUser] = useState("");

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("https://ocwa.herokuapp.com/getuser").then((response) => {
      if (response.data.loggedIn == true) {
        setUser(response.data.player);
      }
    });
    // if(user === "null")
    // {
    //   historyRouter.push("/login");
    // }
  }, []);
  return (

    <div className="homepage">
      {console.log(user)}
      <div className="homepage">
        <h1 id="welcome-text">Welcome to the Online ChessGame!</h1>

        <div className="form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-label">
              <label>
                Player Name: 	&nbsp; &nbsp;
                <input className="form-input" type="text" value={playerName} placeholder="Enter Your Name" onChange={(e) => { setPlayerName(e.target.value) }} />
              </label>
            </div>
            <br />
            <div className="form-label">
              <label>
                Room Code: 	&nbsp; &nbsp;
                <input className="form-input" type="text" value={gameCode} placeholder="Enter Room code" onChange={(e) => { setGameCode(e.target.value) }} />
              </label>
            </div>
            <br />
            <input className="submit-btn" type="submit" value="Start Game" />
          </form>
        </div>
        <div style={{ fontSize: 23 }}>
          <form
            method="GET"
            action="https://ocwa.herokuapp.com/users/logout"
          > <button className="submit-btn"  >Logout</button> </form>
        </div>
      </div>
    </div>

  )
}
