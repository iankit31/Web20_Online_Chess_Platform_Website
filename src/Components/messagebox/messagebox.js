// import React from "react"
// import "./messagebox.css"
// import socket from "../../index"

// function MessageBox() {
//     function displayMessage(message) {
//         let elem = document.getElementById("message-box");
//         console.log(elem);
//         elem.innerHTML = message;
//     }

//     function handleClick() {
//         let message = document.getElementById("message").value;
//         displayMessage(message)
//         socket.emit('send-message', message)
//     }

//     function handleJoinRoom(){
//         let roomId = document.getElementById("roomId").value;
//         socket.emit('joinRoom',roomId);
//         //console.log(socket);
//     }
      
//     return (
//         <div id="display-box">
//             <div id="message-box">

//             </div>
//             <input type="text" name="message" id="message"></input>
//             <button className="btn" onClick={handleClick}>Send</button>
//             <input type="text" name="roomId" id="roomId"></input>
//             <button className="btn" onClick={handleJoinRoom}>Join Room</button>
//         </div>
//     )
// }

// export default MessageBox