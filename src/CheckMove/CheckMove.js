import React from 'react';

let occupiedColor = null;
let occupiedType = null;

export default class checkMove {


    isThereAnyValidMove(color,pieces){
        const direction = color === 'white' ? 1 : -1;
        let flag = false;
        
        pieces.forEach((p)=>{
            if(p.color===color){
                if(p.type==="pawn"){
                    if(this.isValidMove(p.x,p.y,p.x-direction,p.y,"pawn",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-direction,p.y+1,"pawn",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-direction,p.y-1,"pawn",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-direction*2,p.y,"pawn",p.color,pieces,p.color)) {
                        // console.log("There is a valid move for pawn");
                        flag = true;
                    }
                    
                }

                else if(p.type==="knight"){
                    if(
                    this.isValidMove(p.x,p.y,p.x+1,p.y+2,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-1,p.y+2,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x+1,p.y-2,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-1,p.y-2,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x+2,p.y+1,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-2,p.y+1,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x+2,p.y-1,"knight",p.color,pieces,p.color)||
                    this.isValidMove(p.x,p.y,p.x-2,p.y-1,"knight",p.color,pieces,p.color)
                    ) {
                        // console.log("There is a valid move for knight");
                        flag = true;
                    }
                }

                else if(p.type==="king"){
                    if(
                        this.isValidMove(p.x,p.y,p.x+1,p.y+1,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x-1,p.y+1,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x+1,p.y-1,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x-1,p.y-1,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x,p.y+1,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x,p.y-1,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x+1,p.y,"king",p.color,pieces,p.color) ||
                        this.isValidMove(p.x,p.y,p.x-1,p.y,"king",p.color,pieces,p.color) 
                        ) {
                            // console.log("There is a valid move for king");
                            flag = true;
                        }
                }

                else if(p.type==="rook"){
                    
                        for(let i=0;i<=7;i++){
                            if(this.isValidMove(p.x,p.y,i,p.y,"rook",p.color,pieces,p.color)){
                                // console.log("There is a valid move for rook");
                                flag = true;
                            }
                            if(this.isValidMove(p.x,p.y,p.x,i,"rook",p.color,pieces,p.color)){
                                // console.log("There is a valid move for rook");
                                flag = true;
                            }
                        }
                        
                }

                else if(p.type==="bisop"){

                    for(let i=0;i<=7;i++){
                        if(this.isValidMove(p.x,p.y,p.x-i,p.y+i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for bisop");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x+i,p.y+i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for bisop");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x-i,p.y-i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for bisop");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x+i,p.y-i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for bisop");
                            flag = true;
                        }
                    }

                }

                else if(p.type==="queen"){
                    //rook
                    for(let i=0;i<=7;i++){
                        if(this.isValidMove(p.x,p.y,i,p.y,"rook",p.color,pieces,p.color)){
                            // console.log("There is a valid move for queen");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x,i,"rook",p.color,pieces,p.color)){
                            // console.log("There is a valid move for queen");
                            flag = true;
                        }
                    }

                    //bisop

                    for(let i=0;i<=7;i++){
                        if(this.isValidMove(p.x,p.y,p.x-i,p.y+i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for queen");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x+i,p.y+i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for queen");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x-i,p.y-i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for queen");
                            flag = true;
                        }
                        if(this.isValidMove(p.x,p.y,p.x+i,p.y-i,"bisop",p.color,pieces,p.color)){
                            // console.log("There is a valid move for queen");
                            flag = true;
                        }
                    }
                }
            }

        })
        flag ? console.log(`${color} have a valid move`) : console.log(`${color} have no valid move`);
        return flag;
    }

    isOccupied(x,y,pieces){
        let occupiedPiece = pieces.find(p => p.x === x && p.y === y);
        if(occupiedPiece) {
            occupiedColor = occupiedPiece.color;
            occupiedType = occupiedPiece.type;
            return true;
        }
        return false;

        // let flag = false;
        // pieces.forEach((p)=>{
            
        //     if(p.x === x && p.y === y ) 
        //     {
        //         occupiedColor = p.color;
        //         occupiedType = p.type;
        //         flag = true;
        //     }
        // })
        // return flag;
    }

    isKingNotOnCheck(px, py, x, y, opponentColor, pieces) {
        var newPieces = pieces.map(p=>{
            if(p.x === px && p.y === py) {
                //console.log(p);
                return {
                    image: p.image,
                    x: x,
                    y: y,
                    type: p.type, 
                    color: p.color
                }
            }
            return p;
        });
        newPieces = newPieces.filter(p => !(p.x === x && p.y === y && p.color === opponentColor))
        // console.log(newPieces);
        let kx,ky;
        let teamColor = opponentColor === "black" ? "white" : "black";
        newPieces.forEach((p)=>{
            if(p.color === teamColor && p.type === "king" ){
                kx = p.x;
                ky = p.y;
            }
        })

        let isCheck = this.isSquareAttacked(kx, ky, opponentColor, newPieces);
        //console.log(isCheck);
        if(isCheck) {
            //console.log("King is on check so you can't move");
            return false;
        }
        return true;
    }

    isSquareAttacked(x,y,opponentColor,newPieces){
        
        // Attack by Knight 
        const knightX = [x+1,x+1,x-1,x-1,x+2,x+2,x-2,x-2];
        const knightY = [y+2,y-2,y+2,y-2,y+1,y-1,y+1,y-1];

        for(let i=0; i < 8; i++) { 
            if(this.isOccupied(knightX[i],knightY[i],newPieces)){
               if(occupiedColor === opponentColor && occupiedType === "knight"){
                    //console.log("king on attack by Knight at ",knightX[i],knightY[i]);
                    return true;
               }
            }
        }

        // Attack by pawn
        const pawnX = opponentColor === "black" ? [x-1,x-1] : [x+1,x+1];
        const pawnY = [y+1,y-1];

        for(let i=0; i < 2; i++) { 
            if(this.isOccupied(pawnX[i],pawnY[i],newPieces)){
               if(occupiedColor === opponentColor && occupiedType === "pawn"){
                    //console.log("king on attack by pawn at ",pawnX[i],pawnY[i]);
                    return true;
               }
            }
        }

        // Attack by king
        const kingX = [x+1,x+1,x-1,x-1,x,x,x+1,x-1];
        const kingY = [y+1,y-1,y+1,y-1,y+1,y-1,y,y];

        for(let i=0; i < 8; i++) { 
            if(this.isOccupied(kingX[i],kingY[i],newPieces)){
               if(occupiedColor === opponentColor && occupiedType === "king"){
                    //console.log("king on attack by king at ",kingX[i],kingY[i]);
                    return true;
               }
            }
        }

        // attack by rook or queen
        
            // horizontalAxis (---->)
            for(let i=y+1;i<8;i++){
                if(this.isOccupied(x,i,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                        // console.log("king on attack by rook or queen at ",x,i);
                         return true;
                    }
                    break;
                }
            }

            // horizontalAxis (<---)
            for(let i=y-1;i>=0;i--){
                if(this.isOccupied(x,i,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                         //console.log("king on attack by rook or queen at ",x,i);
                         return true;
                    }
                    break;
                }
            }

            // verticalAxis /\
            for(let i=x-1;i>=0;i--){
                if(this.isOccupied(i,y,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                        // console.log("king on attack by rook or queen at ",i,y);
                         return true;
                    }
                    break;
                }
            }

            // verticalAxis \/ 
            for(let i=x+1;i<8;i++){
                if(this.isOccupied(i,y,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                        // console.log("king on attack by rook or queen at ",i,y);
                         return true;
                    }
                    break;
                }
            }
        
        // attack by bishop or queen
        let i,j;

            // 45* 1st quard 
            i = x-1;j = y+1;
            while(i>=0 && j<8){
                if(this.isOccupied(i,j,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                        //console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i--;j++;
            }

            // 135* 2nd quad
            i = x-1;j = y-1;
            while(i>=0 && j>=0){
                if(this.isOccupied(i,j,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                       // console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i--;j--;
            }

            // 225* 3rd quad
            i = x+1;j = y-1;
            while(i<8 && j>=0){
                if(this.isOccupied(i,j,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                       // console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i++;j--;
            }

            //315* 4th quad
            i = x+1;j = y+1;
            while(i<8 && j<8){
                if(this.isOccupied(i,j,newPieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                       // console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i++;j++;
            }


        return false;
    }

    isValidMove(px ,py , x, y, type, color,pieces,whoseChanceItIs , yourColor){
    //  console.log('checking');
    //  console.log(type);
    //  console.log(color);
    
        if((px === x && py === y) || whoseChanceItIs !== color || x < 0 || y < 0 || x > 7 || y > 7 || yourColor !== whoseChanceItIs){
            return false;
        }
        
        let opponentColor = whoseChanceItIs === "white" ? "black" : "white";

        // console.log(x,y);

        // if(this.isSquareAttacked(kx,ky,opponentColor,pieces)){
        //     console.log("king on attack");
        //     //return false;
        // }
        // else{
        //     console.log("not on attack");
        // }
        const direction = color === 'white' ? 1 : -1;
        const sppos = color === 'white' ? 6 : 1;
        
        if(type === 'pawn'){
            if(px === sppos && py === y){
                if(px - x === direction ){
                    // console.log('valid')
                    if(this.isOccupied(x,y,pieces))
                    {
                        return false;
                    }
                    return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);
                }
                else if( px-x === direction*2){
                    if(this.isOccupied(sppos-direction,py,pieces) || this.isOccupied(x,y,pieces)){
                        return false;
                    }
                    return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);
                }
            }
            else if(py === y){
                if(px - x === direction ){
                    if(this.isOccupied(x,y,pieces))
                    {
                        return false;
                    }
                    //console.log('valid')
                    return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);
                }
            }
            else if(Math.abs(py-y) === 1 && direction === px - x ) {
                if(this.isOccupied(x,y,pieces)) {
                    return (occupiedColor !== color) && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);
                }
            }
            return false;
        }
        else if (type === 'rook' ){
           
            if((px === x && py !== y) || (py === y && px !== x) ){
               // console.log('valid')
                if(py !== y){
                   
                    const dir = py < y ? 1 : -1;
                    for( let i = py+dir;dir === 1 ? i<=y : i>=y; i+=dir){
                        if(this.isOccupied(x,i,pieces)){
                            return occupiedColor !== color && i === y && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);                             
                        }
                        if( i === y )
                            return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);
                    }
                    return false;
                }
                else{
                    const dir = px < x ? 1 : -1;
                    for( let i = px+dir;dir === 1 ? i<=x : i>=x; i+=dir){
                        if(this.isOccupied(i,y,pieces)){
                            // if same color than break 
                            //console.log(occupiedColor)
                            // different colors (i = x j =y ) attack
                            return occupiedColor !== color && i === x && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);                             
                        }
                        if( i === x )
                            return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces);
                    }
                    return false;
                }
            }
            return false;
        }
        else if( type === 'bishop')
        {
            //console.log(px,py,x,y);
            if((px - x === py - y) || (px - x === y - py )){
               // console.log('valid')
                if(px -x === py - y){

                    const dir = py < y ? 1 : -1;
                    for(let i = px + dir,j = py + dir;dir === 1 ? i<=x : i>=y , dir === 1 ? j<=y : j>=y;i+=dir,j+=dir){

                        if(this.isOccupied(i,j,pieces)){
                            return occupiedColor !== color && i === x && j === y && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
                        } 
                        if( i === x && j === y )
                            return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
                    }
                }
                else
                {
                    const dir = py < y ? 1 : -1;
                    for(let i = px + -1*dir,j=py+dir;dir === 1 ? i>=x : i<=x, dir === 1 ? j<=y : j>=y; i+= -1*dir, j+=dir){
                        if(this.isOccupied(i,j,pieces)){
                            return occupiedColor !== color && i === x && j === y && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
                        } 
                        if( i === x && j === y )
                            return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
                    }
                }

                return false;
            }
            return false;
        }
        else if(type === 'knight')
        {
            if((Math.abs(px-x) === 1 && Math.abs(py - y) === 2) || (Math.abs(px-x) === 2 && Math.abs(py - y) === 1))
            {
               // console.log('valid');
                if(this.isOccupied(x,y,pieces)){
                    return occupiedColor !== color && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
                }
                return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
            }
            return false;
        }
        else{
            if(Math.abs(px-x) <= 1 && Math.abs(py-y) <= 1){
               // console.log('valid');
                if(this.isOccupied(x,y,pieces)){
                    return occupiedColor !== color && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
                }
                return true && this.isKingNotOnCheck(px, py, x, y, opponentColor, pieces); 
            }
            return false;
        }

        
       
    }
}
