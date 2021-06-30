import React from "react"
import "./chessboard.css"
import Tile from "../tile/tile"

let board = [];

let horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
let verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

for(let row=0; row<=7; row++) {    
    for(let col=0; col<=7; col++) {
        board.push(<span>
            {/* {horizontalAxis[row]} {verticalAxis[7-col]}  */}
            <Tile row={row} col={col} id={horizontalAxis[row] + verticalAxis[7-row]} /></span>)
    }
}

function Chessboard() {
    return (
        <div className="chessboard">
            {board}
        </div>
    )
}

export default Chessboard