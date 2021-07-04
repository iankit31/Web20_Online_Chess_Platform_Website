import React from 'react';


export default class checkMove {
    isValidMove(px ,py , x, y, type, color){
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
                if(px - x === direction || px-x === direction*2){
                    console.log('valid')
                    return true;
                }
            }else if(py === y){
                if(px - x === direction ){
                    console.log('valid')
                    return true;
                }
            }
            return false;
        }
        else if (type === 'rook'){
            if((px === x && py !== y) || (py === y && px !== x) ){
                console.log('valid')
                // if(py !== y){
                //     for(let i = y; i<=py; i){
                //         isOccupied()
                //     }
                // }
                // else {

                // }
                return true;
            }
            return false;
        }
        else if( type == 'bisop')
        {
            console.log(px,py,x,y);
            if((px - x === py - y) || (px - x === y - py )){
                console.log('valid')
                return true;
            }
            return false;
        }
        else if(type === 'knight')
        {
            if((Math.abs(px-x) === 1 && Math.abs(py - y) === 2) || (Math.abs(px-x) === 2 && Math.abs(py - y) === 1))
            {
                console.log('valid')
                return true;
            }
            return false;
        }
       
    }
}
