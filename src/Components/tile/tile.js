import React from "react"
import "./tile.css"

let piece = null;

function Tile(props) {
    if(props.row === 6) {
        piece = <img src="images/wp.png" />
    } 
    else if(props.row === 1) {
        piece = <img src="images/bp.png" />
    }
    else if(props.row === 0) {
        if(props.col===0 || props.col===7) {
            piece = <img src="images/br.png" />
        }
        if(props.col===1 || props.col===6) {
            piece = <img src="images/bn.png" />
        }
        if(props.col===2 || props.col===5) {
            piece = <img src="images/bb.png" />
        }
        if(props.col===3) {
            piece = <img src="images/bk.png" />
        }
        if(props.col===4) {
            piece = <img src="images/bq.png" />
        }
    }
    else if(props.row === 7) {
        if(props.col===0 || props.col===7) {
            piece = <img src="images/wr.png" />
        }
        if(props.col===1 || props.col===6) {
            piece = <img src="images/wn.png" />
        }
        if(props.col===2 || props.col===5) {
            piece = <img src="images/wb.png" />
        }
        if(props.col===3) {
            piece = <img src="images/wk.png" />
        }
        if(props.col===4) {
            piece = <img src="images/wq.png" />
        }
    }
    else {
        piece = null;
    }
        if((props.row + props.col) %2 === 0) {
            return (   
                <div className="tile black-tile">
                    {piece}
                </div>
            )
        }
        else {
            return(
                <div className="tile white-tile">
                    {piece}
                </div>
            ) 
        }
}

export default Tile