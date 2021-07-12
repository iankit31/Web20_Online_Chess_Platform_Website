import React from "react"
import "./messagebox.css"
import socket from "../../index"

function MessageBox() {
    function displayMessage(message) {
        let elem = document.getElementById("message-box");
        console.log(elem);
        elem.innerHTML = message;
    }

    function handleClick() {
        let message = document.getElementById("message").value;
        displayMessage(message)
        socket.emit('send-message', message)
    }

    return (
        <div id="display-box">
            <div id="message-box">

            </div>
            <input type="text" name="message" id="message"></input>
            <button className="btn" onClick={handleClick}>Send</button>
        </div>
    )
}

export default MessageBox