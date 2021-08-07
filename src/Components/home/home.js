import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios"
import "./home.css"
import Cookies from 'js-cookie';


export default function Home() {
  const historyRouter = useHistory();

  const [gameCode, setGameCode] = useState("")
  const [joinGameCode, setJoinGameCode] = useState("")

  const handleStartClick = (e) => {
    e.preventDefault();
    historyRouter.push(`/chess/${gameCode}`);
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    historyRouter.push(`/chess/${joinGameCode}`);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('in logout handle');
    Cookies.remove('jwt');

    historyRouter.push('/');
    // window.location.href = "https://chessiiti.netlify.app/";
  };

  const [user, setUser] = useState({
    playerName: "",
    playerId: "",
    playerEmailId: "",
    playerPassword: "",
    playerRating: "",
  });

  Axios.defaults.withCredentials = true;
  useEffect(() => {


    Axios.get(
      "https://ocwa.herokuapp.com/users/getuser"
       
      )
      .then((res)=>{
        if(res.data.msg === 'verified')
        {
          setUser(res.data.user);
        }
  })
  
  }, []);

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

  return (
    <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form >
                    <h1>Account Detail</h1>
                    <h2>Player Name : {`${user.playerName}`}</h2>
                    <h2>UserName : {`${user.playerId}`}</h2>
                    <h2>Email : {`${user.playerEmailId}`}</h2>
                    <h2>Rating : {`${user.playerRating}`}</h2>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form >
                    <h1>Start Game</h1>
                    <input type="text" value={gameCode} placeholder="Enter New Room code" onChange={(e) => { setGameCode(e.target.value) }} required/>
                    <br/>
                    <button onClick={(e) => handleStartClick(e)}>Start New Game</button>
                    <br/>
                    <input type="text" value={joinGameCode} placeholder="Enter Friend's Room code" onChange={(e) => { setJoinGameCode(e.target.value) }} required/>
                    <br/>
                    <button onClick={(e) => handleJoinClick(e)}>Join Friend's Game</button>
                    <br/>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Join Battle</h1>
                        <p>Enter unique Code to start New Game or Join Friend's Game with Game code</p>
                        <button className="ghost" id="signIn">Start Game</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Start Game</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp">Profile</button>
                        <br/>
                        
                         <button className="ghost" id="logOut" onClick={(e) => handleLogout(e)}>Logout</button>
                       
                    </div>
                </div>
            </div>
        </div>
  )
}
