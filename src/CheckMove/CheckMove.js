import React from 'react';

let occupiedColor = null;
let occupiedType = null;

export default class checkMove {

    isOccupied(x,y,pieces){
        let flag = false;
        pieces.forEach((p)=>{
            
            if(p.x === x && p.y === y ) 
            {
                occupiedColor = p.color;
                occupiedType = p.type;
                flag = true;
            }
        })
        return flag;
    }

    isSquareAttacked(x,y,opponentColor,pieces){
        
        // Attack by Knight 
        const knightX = [x+1,x+1,x-1,x-1,x+2,x+2,x-2,x-2];
        const knightY = [y+2,y-2,y+2,y-2,y+1,y-1,y+1,y-1];

        for(let i=0; i < 8; i++) { 
            if(this.isOccupied(knightX[i],knightY[i],pieces)){
               if(occupiedColor === opponentColor && occupiedType === "knight"){
                    console.log("king on attack by Knight at ",knightX[i],knightY[i]);
                    return true;
               }
            }
        }

        // Attack by pawn
        const pawnX = opponentColor === "black" ? [x-1,x-1] : [x+1,x+1];
        const pawnY = [y+1,y-1];

        for(let i=0; i < 2; i++) { 
            if(this.isOccupied(pawnX[i],pawnY[i],pieces)){
               if(occupiedColor === opponentColor && occupiedType === "pawn"){
                    console.log("king on attack by pawn at ",pawnX[i],pawnY[i]);
                    return true;
               }
            }
        }

        // Attack by king
        const kingX = [x+1,x+1,x-1,x-1,x,x,x+1,x-1];
        const kingY = [y+1,y-1,y+1,y-1,y+1,y-1,y,y];

        for(let i=0; i < 8; i++) { 
            if(this.isOccupied(kingX[i],kingY[i],pieces)){
               if(occupiedColor === opponentColor && occupiedType === "king"){
                    console.log("king on attack by king at ",kingX[i],kingY[i]);
                    return true;
               }
            }
        }

        // attack by rook or queen
        
            // horizontalAxis (---->)
            for(let i=y+1;i<8;i++){
                if(this.isOccupied(x,i,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                         console.log("king on attack by rook or queen at ",x,i);
                         return true;
                    }
                    break;
                }
            }

            // horizontalAxis (<---)
            for(let i=y-1;i>=0;i--){
                if(this.isOccupied(x,i,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                         console.log("king on attack by rook or queen at ",x,i);
                         return true;
                    }
                    break;
                }
            }

            // verticalAxis /\
            for(let i=x-1;i>=0;i--){
                if(this.isOccupied(i,y,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                         console.log("king on attack by rook or queen at ",i,y);
                         return true;
                    }
                    break;
                }
            }

            // verticalAxis \/ 
            for(let i=x+1;i<8;i++){
                if(this.isOccupied(i,y,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "rook" || occupiedType === "queen")){
                         console.log("king on attack by rook or queen at ",i,y);
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
                if(this.isOccupied(i,j,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                        console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i--;j++;
            }

            // 135* 2nd quad
            i = x-1;j = y-1;
            while(i>=0 && j>=0){
                if(this.isOccupied(i,j,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                        console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i--;j--;
            }

            // 225* 3rd quad
            i = x+1;j = y-1;
            while(i<8 && j>=0){
                if(this.isOccupied(i,j,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                        console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i++;j--;
            }

            //315* 4th quad
            i = x+1;j = y+1;
            while(i<8 && j<8){
                if(this.isOccupied(i,j,pieces)){
                    if(occupiedColor === opponentColor && ( occupiedType === "bishop" || occupiedType === "queen")){
                        console.log("king on attack by bishop or queen at ",i,j);
                        return true;
                    }
                    break;
                }
                i++;j++;
            }


        return false;
    }

    isValidMove(px ,py , x, y, type, color,pieces,whoseChanceItIs){
    //  console.log('checking');
    //  console.log(type);
    //  console.log(color);
    
        if((px === x && py === y) || whoseChanceItIs !== color ){
            return false;
        }
        
        let opponentColor = whoseChanceItIs === "white" ? "black" : "white";
        let kx,ky;
        pieces.forEach((p)=>{
            if(p.color === whoseChanceItIs && p.type === "king" ){
                kx = p.x;
                ky = p.y;
            }
        })

        console.log(x,y);

        if(this.isSquareAttacked(kx,ky,opponentColor,pieces)){
            console.log("king on attack");
            //return false;
        }
        else{
            console.log("not on attack");
        }
        const direction = color === 'white' ? 1 : -1;
        const sppos = color === 'white' ? 6 : 1;
        
        if(type === 'pawn'){
            if(px === sppos && py === y){
                if(px - x === direction ){
                    console.log('valid')
                    if(this.isOccupied(x,y,pieces))
                    {
                        return false;
                    }
                    return true;
                }
                else if( px-x === direction*2){
                    if(this.isOccupied(sppos-direction,py,pieces) || this.isOccupied(x,y,pieces)){
                        return false;
                    }
                    return true;
                }
            }
            else if(py === y){
                if(px - x === direction ){
                    if(this.isOccupied(x,y,pieces))
                    {
                        return false;
                    }
                    console.log('valid')
                    return true;
                }
            }
            else if(Math.abs(py-y) === 1 && direction === px - x ) {
                if(this.isOccupied(x,y,pieces)) {
                    return occupiedColor !== color;
                }
            }
            return false;
        }
        else if (type === 'rook' ){
           
            if((px === x && py !== y) || (py === y && px !== x) ){
                console.log('valid')
                if(py !== y){
                   
                    const dir = py < y ? 1 : -1;
                    for( let i = py+dir;dir === 1 ? i<=y : i>=y; i+=dir){
                        if(this.isOccupied(x,i,pieces)){
                            return occupiedColor !== color && i === y;                             
                        }
                        if( i === y )
                            return true;
                    }
                    return false;
                }
                else{
                    const dir = px < x ? 1 : -1;
                    for( let i = px+dir;dir === 1 ? i<=x : i>=x; i+=dir){
                        if(this.isOccupied(i,y,pieces)){
                            // if same color than break 
                            console.log(occupiedColor)
                            // different colors (i = x j =y ) attack
                            return occupiedColor !== color && i === x;                             
                        }
                        if( i === x )
                            return true;
                    }
                    return false;
                }
            }
            return false;
        }
        else if( type == 'bishop')
        {
            console.log(px,py,x,y);
            if((px - x === py - y) || (px - x === y - py )){
                console.log('valid')
                if(px -x === py - y){

                    const dir = py < y ? 1 : -1;
                    for(let i = px + dir,j = py + dir;dir === 1 ? i<=x : i>=y , dir === 1 ? j<=y : j>=y;i+=dir,j+=dir){

                        if(this.isOccupied(i,j,pieces)){
                            return occupiedColor !== color && i === x && j === y;  
                        } 
                        if( i === x && j === y )
                            return true;   
                    }
                }
                else
                {
                    const dir = py < y ? 1 : -1;
                    for(let i = px + -1*dir,j=py+dir;dir === 1 ? i>=x : i<=x, dir === 1 ? j<=y : j>=y; i+= -1*dir, j+=dir){
                        if(this.isOccupied(i,j,pieces)){
                            return occupiedColor !== color && i === x && j === y; 
                        } 
                        if( i === x && j === y )
                            return true; 
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
                console.log('valid');
                if(this.isOccupied(x,y,pieces)){
                    return occupiedColor !== color; 
                }
                return true;
            }
            return false;
        }
        else{
            if(Math.abs(px-x) <= 1 && Math.abs(py-y) <= 1){
                console.log('valid');
                if(this.isOccupied(x,y,pieces)){
                    return occupiedColor !== color; 
                }
                return true;
            }
            return false;
        }

        
       
    }
}
