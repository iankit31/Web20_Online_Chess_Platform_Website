import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import "./loginForm.css";
export default function Loginform() {
    // return (<h1>Hello</h1>)
    const historyRouter = useHistory();
    const [playerId, setPlayerId] = useState("")
    const [playerPassword, setPlayerPassword] = useState("")


    return (

        <div className="loginForm">
            <div className="main-div">
                <div className="shadow-inner">
                    <h1 id="welcome-text">Welcome to Chess Infinity</h1>
                    <div className="form">
                        <form method="POST" action="https://ocwa.herokuapp.com/users/login">
                            <div className="form-label">
                                <label>
                                    <input name="id" className="form-input" type="text" value={playerId} placeholder="User Id" onChange={(e) => { setPlayerId(e.target.value) }} />
                                </label>
                            </div>
                            <br />
                            <div className="form-label">
                                <label>
                                    <input name="password" className="form-input" type="password" value={playerPassword} autoComplete="on" placeholder="Password" onChange={(e) => { setPlayerPassword(e.target.value) }} />
                                </label>
                            </div>
                            <br />
                            <input className="submit-btn" type="submit" value="Login" />
                        </form>
                    </div>

                    <div id="regbtn">
                        <h1 className="register-text">Don't have an account?</h1> &nbsp;
                        <button className="submit-btn" onClick={(e) => {
                        e.preventDefault(); historyRouter.push(`/register`);
                        }}>Register Here</button>
                    </div>
                </div>
                <div className="imgbox">
                    <h1 className="Chessname">Chess</h1>
                    <h1 className="infinity">∞</h1>
                    <img src="/src/king.jpg" className="king-img"></img>
                </div>
            </div>
        </div>
    )
}