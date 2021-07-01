import React from "react"
import "./tile.css"

let piece = null;

function Tile(props) {
    if(props.row === 6) {
        piece = "images/wp.png"
    } 
    else if(props.row === 1) {
        piece = "images/bp.png"
    }
    else if(props.row === 0) {
        if(props.col===0 || props.col===7) {
            piece = "images/br.png"
        }
        if(props.col===1 || props.col===6) {
            piece = "images/bn.png"
        }
        if(props.col===2 || props.col===5) {
            piece = "images/bb.png"
        }
        if(props.col===3) {
            piece = "images/bk.png"
        }
        if(props.col===4) {
            piece = "images/bq.png"
        }
    }
    else if(props.row === 7) {
        if(props.col===0 || props.col===7) {
            piece = "images/wr.png"
        }
        if(props.col===1 || props.col===6) {
            piece = "images/wn.png"
        }
        if(props.col===2 || props.col===5) {
            piece = "images/wb.png"
        }
        if(props.col===3) {
            piece = "images/wk.png"
        }
        if(props.col===4) {
            piece = "images/wq.png"
        }
    }
    else {
        piece = null;
    }
        if((props.row + props.col) %2 === 0) {
            return (   
                <div className="tile black-tile">
                    {piece && <div style = {{backgroundImage: `url(${piece})`}} className="chess-piece" ></div>}
                </div>
            )
        }
        else {
            return(
                <div className="tile white-tile">
                    {piece && <div style = {{backgroundImage: `url(${piece})`}} className="chess-piece" ></div>}
                </div>
            ) 
        }
}

export default Tile