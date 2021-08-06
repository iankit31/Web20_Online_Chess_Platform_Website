import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import "./registration.css";

export default function Registerform() {
    const historyRouter = useHistory();
    const [playerName, setPlayerName] = useState("")
    const [playerId, setPlayerId] = useState("")
    const [playerEmailId, setPlayerEmailId] = useState("")
    const [playerPassword, setPlayerPassword] = useState("")

    // const handleRegister = (e) => {
    // 	e.preventDefault();
    // 	// historyRouter.push(`/createuser`);
    // };

    return (

        <div className="registrationForm">

            <h1 className="welcome-text">Welcome to Chess ∞</h1>
            <h1 className="welcome-text" style={{ fontSize:25, fontWeight:500}}>Register Here</h1>
            
            <div className="form">
                <form method="POST" action="https://ocwa.herokuapp.com/users/register">
                    <div className="form-label">
                        <label>
                            <input name="name" className="form-input" type="text" value={playerName} placeholder="Enter Your Name" onChange={(e) => { setPlayerName(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            <input name="id" className="form-input" type="text" value={playerId} placeholder="Enter Your unique userId" onChange={(e) => { setPlayerId(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            <input name="email" className="form-input" type="email" value={playerEmailId} placeholder="Enter Your Email Id" onChange={(e) => { setPlayerEmailId(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <div className="form-label">
                        <label>
                            <input name="password" className="form-input" type="password" autoComplete="on" value={playerPassword} placeholder="Enter password" onChange={(e) => { setPlayerPassword(e.target.value) }} />
                        </label>
                    </div>
                    <br />
                    <input className="submit-btn" type="submit" value="Register User" />
                </form>
            </div>

            <div className="go-back-btn">
                <button className="back-btn" onClick={(e) => {
                    e.preventDefault(); historyRouter.push(`/login`);
                }}>Go Back to Login Page</button>
            </div>
            
        </div>
    )
}