import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import "./registration.css";

export default function Registerform() {
    const historyRouter = useHistory();
    const [playerName, setPlayerName] = useState("")
    const [playerId, setPlayerId] = useState("")
    const [playerEmailId, setPlayerEmailId] = useState("")
    const [playerPassword, setPlayerPassword] = useState("")

    return (

        <div className="registrationForm">

            <h1 id="welcome-text">New User Register Here</h1>

            <div className="form">
                <form method="POST" action="http://localhost:5000/users/register">
                    <div className="form-label">
                        <label>
                            Player Name: 	&nbsp; &nbsp;
                            <input name="name" className="form-input" type="text" value={playerName} placeholder="Enter Your Name" onChange={(e) => { setPlayerName(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            User Id: 	&nbsp; &nbsp;
                            <input name="id" className="form-input" type="text" value={playerId} placeholder="Enter Your unique userId" onChange={(e) => { setPlayerId(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            Email Id: 	&nbsp; &nbsp;
                            <input name="email" className="form-input" type="email" value={playerEmailId} placeholder="Enter Your Email Id" onChange={(e) => { setPlayerEmailId(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            Password: 	&nbsp; &nbsp;
                            <input name="password" className="form-input" type="password" autoComplete="on" value={playerPassword} placeholder="Enter password" onChange={(e) => { setPlayerPassword(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <input className="submit-btn" type="submit" value="Register User" />
                </form>
            </div>

            <div style={{ fontSize: 23 }}>
                already registered, &nbsp;
                <button className="submit-btn" onClick={(e) => {
                    e.preventDefault(); historyRouter.push(`/login`);
                }}>Login Here</button>
            </div>
        </div>
    )
}