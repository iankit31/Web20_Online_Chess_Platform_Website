import React from "react"
import "./tile.css"

function Tile(props) {
    let piece = null;
    props.pieces.forEach( p =>{
        if(props.row === p.x && props.col === p.y) {
            piece = p;
        }
    })

    let highlighted = false;
    if(props.activeTile !== null) {
        props.activeTile.forEach( p =>{
            if(props.row === p.x && props.col === p.y) {
                highlighted = true;
            }
        })
    }

    if(highlighted)
    {
        if ((props.row + props.col) % 2 === 0) {
            return (
                <div className="tile black-tile highlighted" >
                    {piece && <div style={{ backgroundImage: `url(${piece.image})` }} className="chess-piece" ></div>}
                </div>
            )
        }
        else {
            return (
                <div className="tile white-tile highlighted" >
                    {piece && <div style={{ backgroundImage: `url(${piece.image})` }} className="chess-piece"></div>}
                </div>
            )
        }
    }
    else
    {
        if ((props.row + props.col) % 2 === 0) {
            return (
                <div className="tile black-tile" >
                    {piece && <div style={{ backgroundImage: `url(${piece.image})` }} className="chess-piece" ></div>}
                </div>
            )
        }
        else {
            return (
                <div className="tile white-tile" >
                    {piece && <div style={{ backgroundImage: `url(${piece.image})` }} className="chess-piece"></div>}
                </div>
            )
        }
    }
}

export default Tile