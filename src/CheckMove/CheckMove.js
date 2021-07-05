import React from 'react';

let occupiedColor = null;

export default class checkMove {

    isOccupied(x,y,pieces){
        
        let flag = false;
        pieces.forEach((p)=>{
            
            if(p.x === x && p.y === y ) 
            {
                occupiedColor = p.color;
                flag = true;
            }
        })
        return flag;
    }

    capturePiece(x,y,pieces,setPieces)
    {
        setPieces(pieces => {
            console.log('in setPieces')
            let newPieces = pieces.filter(p =>
                
                !(p.x === x && p.y === y)
                
            )
            console.log(newPieces.length)

            return newPieces;
        })
    }

    isValidMove(px ,py , x, y, type, color,pieces,setPieces){
    //  console.log('checking');
    //  console.log(type);
    //  console.log(color);

    const direction = color === 'white' ? 1 : -1;
    const sppos = color === 'white' ? 6 : 1;
        
        if(px === x && py === y){
            return false;
        }

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
                    if(this.isOccupied(sppos+direction,py,pieces) || this.isOccupied(x,y,pieces)){
                        return false;
                    }
                    return true;
                }
            }
            else if(py === y){
                if(px - x === direction ){
                    console.log('valid')
                    return true;
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
                            // if same color than break 
                            console.log(occupiedColor)
                            // different colors (i =x j =y ) attack
                            if(occupiedColor === color )
                               return false;
                            else {

                            }
                            return false;
                            
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
                            if(occupiedColor === color )
                                return false;
                            else {

                            }
                            return false;
                            
                        }
                        if( i === x )
                            return true;
                    }
                    return false;
                }
            }
            return false;
        }
        else if( type == 'bisop')
        {
            console.log(px,py,x,y);
            if((px - x === py - y) || (px - x === y - py )){
                console.log('valid')
                if(px -x === py - y){

                    const dir = py < y ? 1 : -1;
                    for(let i = px + dir,j = py + dir;dir === 1 ? i<=x : i>=y , dir === 1 ? j<=y : j>=y;i+=dir,j+=dir){

                        if(this.isOccupied(i,j,pieces)){
                            if(occupiedColor === color )
                                return false;
                            else {

                            }
                            return false;
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
                            if(occupiedColor === color )
                                return false;
                            else {

                            }
                            return false;
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
                    if(occupiedColor === color )
                        return false;
                    else{
                        console.log('call capture ')
                        this.capturePiece(x,y,pieces,setPieces);
                    }
                }
                return true;
            }
            return false;
        }
        else{
            if(Math.abs(px-x) <= 1 && Math.abs(py-y) <= 1){
                console.log('valid');
                if(this.isOccupied(x,y,pieces)){
                    if(occupiedColor === color )
                        return false;
                    else{

                    }
                }
                return true;
            }
            return false;
        }

        
       
    }
}
