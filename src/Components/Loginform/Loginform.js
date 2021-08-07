import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import "./loginForm.css";
import Axios from 'axios';
import Cookies from 'js-cookie';

export default function Loginform() {
    const historyRouter = useHistory();

    const [playerId, setPlayerId] = useState("")
    const [playerPassword, setPlayerPassword] = useState("")
    const [playerName, setPlayerName] = useState("")
    const [playerEmail, setPlayerEmail] = useState("")

    const [loginPlayerId, setLoginPlayerId] = useState("")
    const [loginPlayerPassword, setLoginPlayerPassword] = useState("")
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, [])

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        
        // console.log('in logout handle');
        // Axios.post("https://ocwa.herokuapp.com/users/login",
        // { 
        //     id: loginPlayerId,
        //     password: loginPlayerPassword,  
        // },{withCredentials:true})
        Axios.post(
            "https://ocwa.herokuapp.com/users/login",
             {
              id: loginPlayerId,
              password: loginPlayerPassword,
            }
            )
            .then((res)=>{
              if(res.data.msg === 'logsuc')
              {
                Cookies.set('jwt', res.data.token)
                console.log(Cookies.get());
              }
            })

            window.location.href = "https://chessiiti.netlify.app/chessgame/";
      };
    
    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form method="POST" action="https://ocwa.herokuapp.com/users/register">
                    <h1>Create Account</h1>
                    <input type="text" name="name" placeholder="Name"  value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} required/>
                    <input type="text" name="id" placeholder="Username"  value={playerId}  onChange={(e) => { setPlayerId(e.target.value) }} required/>
                    <input type="email" name="email" placeholder="Email"  value={playerEmail} onChange={(e) => { setPlayerEmail(e.target.value) }} required/>
                    <input type="password" name="password" placeholder="Password"  value={playerPassword} onChange={(e) => { setPlayerPassword(e.target.value) }} required/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={(e) => { handleLoginSubmit(e)}} >
                    <h1>Sign in</h1>
                    <input type="text" name="id" placeholder="Username"  value={loginPlayerId} onChange={(e) => { setLoginPlayerId(e.target.value) }}  required/>
                    <input type="password" name="password" placeholder="Password" value={loginPlayerPassword} onChange={(e) => { setLoginPlayerPassword(e.target.value) }} required/>
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}