import React from "react"
import "./tile.css"

function Tile(props) {
    let piece = null;
    props.pieces.forEach( p =>{
        if(props.row === p.x && props.col === p.y) {
            piece = p;
        }
    })

    if ((props.row + props.col) % 2 === 0) {
        return (
            <div className="tile black-tile">
                {piece && <div style={{ backgroundImage: `url(${piece.image})` }} className="chess-piece" ></div>}
            </div>
        )
    }
    else {
        return (
            <div className="tile white-tile">
                {piece && <div style={{ backgroundImage: `url(${piece.image})` }} className="chess-piece" ></div>}
            </div>
        )
    }
}

export default Tile