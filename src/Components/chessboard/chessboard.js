import React, { useEffect, useRef } from "react"
import { useState } from "react"
import "./chessboard.css"
import Tile from "../tile/tile"
import CheckMove from "../../CheckMove/CheckMove"
// import socket from "../../index"
import {io} from 'socket.io-client'
// let horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
// let verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
const socket = io('http://localhost:3001');

const initialBoard = [];

initialBoard.push({ image:"images/br.png", x:0, y:0,  type: "rook", color: "black"});
initialBoard.push({ image:"images/br.png", x:0, y:7,  type: "rook", color: "black"});
initialBoard.push({ image:"images/bn.png", x:0, y:1,  type: "knight", color: "black" });
initialBoard.push({ image:"images/bn.png", x:0, y:6,  type: "knight", color: "black" });
initialBoard.push({ image:"images/bb.png", x:0, y:2,  type: "bishop", color: "black"});
initialBoard.push({ image:"images/bb.png", x:0, y:5,  type: "bishop", color: "black"});
initialBoard.push({ image:"images/bq.png", x:0, y:3,  type: "queen", color: "black" });
initialBoard.push({ image:"images/bk.png", x:0, y:4,  type: "king", color: "black"});

initialBoard.push({ image:"images/wr.png", x:7, y:0,  type: "rook", color: "white"});
initialBoard.push({ image:"images/wr.png", x:7, y:7,  type: "rook", color: "white"});
initialBoard.push({ image:"images/wn.png", x:7, y:1,  type: "knight", color: "white"});
initialBoard.push({ image:"images/wn.png", x:7, y:6,  type: "knight", color: "white"});
initialBoard.push({ image:"images/wb.png", x:7, y:2,  type: "bishop", color: "white"});
initialBoard.push({ image:"images/wb.png", x:7, y:5,  type: "bishop", color: "white"});
initialBoard.push({ image:"images/wq.png", x:7, y:3,  type: "queen", color: "white"});
initialBoard.push({ image:"images/wk.png", x:7, y:4,  type: "king", color: "white"});

for (let i = 0; i < 8; i++) { initialBoard.push({ image:"images/bp.png", x:1, y:i,  type: "pawn", color: "black" }) };
for (let i = 0; i < 8; i++) { initialBoard.push({ image:"images/wp.png", x:6, y:i, type: "pawn", color: "white" }) };


function Chessboard() {
    const chessBoardRef = useRef(null);
    const [pieces, setPieces] = useState(initialBoard);
    const [initialX, setInitialX] = useState(null);
    const [initialY, setInitialY] = useState(null);
    const [activePiece, setActivePiece] = useState(null);
    const [whoseChanceItIs, setWhoseChanceItIs] = useState("white");

    const checkMove = new CheckMove();
    // console.log(pieces);
    socket.on('connect', ()=>{
        socket.on('recieve-pieces',pieces =>{
            setPieces(pieces);
            setWhoseChanceItIs(prevwhoseChanceItIs=>{
                if(prevwhoseChanceItIs === "white" ){
                    return "black";
                }else{
                    return "white";
                }
            })
        })
    })

    let board = [];
    for (let row = 0; row <= 7; row++) {
        for (let col = 0; col <= 7; col++) {
            board.push(<span>
                {/* {horizontalAxis[row]} {verticalAxis[7-col]}  */}
                <Tile 
                    pieces={pieces} 
                    row={row} 
                    col={col} 
                    key={`horizontalAxis[row],verticalAxis[7 - row]`} /></span>)
        }
    }

    function grabPiece(e) {
        const chessboard = chessBoardRef.current;
        const element = e.target
        if (element.classList.contains("chess-piece")) {
            setInitialY(Math.floor((e.clientX - chessboard.offsetLeft)/70));
            setInitialX(Math.floor((e.clientY - chessboard.offsetTop)/70));
            // console.log(e);

            const x = e.clientX - 35;
            const y = e.clientY - 35;
            element.style.position = "absolute";
            element.style.left = `${x}px`
            element.style.top = `${y}px`
            setActivePiece(element);
        }
        //console.log(e.target)
    }

    function movePiece(e) {

        const chessboard = chessBoardRef.current;

        if (activePiece) {
            const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 15;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 60;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 60;
            const x = e.clientX - 35;
            const y = e.clientY - 35;
            activePiece.style.position = "absolute";

            activePiece.style.top = `${y}px`
            activePiece.style.left = `${x}px`


        }
        //console.log(e.target)
    }

    function dropPiece(e) {
        const chessboard = chessBoardRef.current;
        const col_num = Math.floor((e.clientX - chessboard.offsetLeft)/70);
        const row_num = Math.floor((e.clientY - chessboard.offsetTop)/70);
        const minX = chessboard.offsetLeft;
        const minY = chessboard.offsetTop;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth;
        const maxY = chessboard.offsetTop + chessboard.clientHeight;
        // console.log(initialX, initialY);
        // console.log(row_num, col_num);

        if (activePiece) {
            if(e.clientX > maxX || e.clientX < minX || e.clientY > maxY || e.clientY < minY) {
                console.log("outside board");
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                    setActivePiece(null);
                  
            } else{
                const currentPiece = pieces.find(p=>p.x === initialX && p.y === initialY);
                const attackedPiece = pieces.find(p=>p.x === row_num && p.y === col_num);

                
                if(currentPiece) {

                    let validMove = null;
                    if(currentPiece.type === 'queen')
                        validMove = checkMove.isValidMove(initialX, initialY, row_num, col_num, 'rook', currentPiece.color,pieces,whoseChanceItIs) || checkMove.isValidMove(initialX, initialY, row_num, col_num, 'bishop', currentPiece.color,pieces,whoseChanceItIs);
                    else
                        validMove = checkMove.isValidMove(initialX, initialY, row_num, col_num, currentPiece.type, currentPiece.color,pieces,whoseChanceItIs);
                    if(validMove){
                        socket.emit('send-piece-move', currentPiece, row_num, col_num, initialX, initialY);
                        // currentPiece.x = row_num;
                        // currentPiece.y = col_num;
                        setPieces(prevPieces=>{
                            prevPieces = prevPieces.filter(p=>!(p===attackedPiece))
                            let newPieces = prevPieces.map(p=>{
                                if(p===currentPiece) {
                                    p.x = row_num;
                                    p.y = col_num;
                                }

                                if(p.type === "pawn" )
                                {  
                                    if(p.color === "white" && p.x === 0 ){
                                        p.type = "queen";
                                        p.image = "images/wq.png";
                                    }else if(p.color === "black" && p.x === 7){
                                        p.type = "queen";
                                        p.image = "images/bq.png";
                                    }
                                }

                                return p;
                            })

                            let opponentColor = currentPiece.color==="white" ? "black" : "white";
                            if(!checkMove.isThereAnyValidMove(opponentColor,newPieces)){
                                    
                                if(!checkMove.isKingNotOnCheck(-1,-1,-1,-1,currentPiece.color,newPieces)){
                                    console.log("checkmate")
                                }
                                else{
                                    console.log("stalemate")
                                }
                            }
                            socket.emit('send-pieces', newPieces);
                            return newPieces;
                        })
                        
                        setWhoseChanceItIs(prevwhoseChanceItIs=>{
                            if(prevwhoseChanceItIs === "white" ){
                                return "black";
                            }else{
                                return "white";
                            }
                        })
                       
                        
                    }else{
                        activePiece.style.position = 'relative';
                        activePiece.style.removeProperty('top');
                        activePiece.style.removeProperty('left');
                    }      
                }     
                
            }
            setActivePiece(null);
            setInitialX(null);
            setInitialY(null);
        }

    }

    return (
        <div
            className="chessboard"
            ref={chessBoardRef}
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={e => dropPiece(e)}
        >
            {board}
            {/* {console.log(pieces)} */}
        </div>
    )
}

export default Chessboard