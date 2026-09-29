import React from "react";

export default function useLocalStorage(cardsArray,guessCount,correctGuesses,count,bool,themeColor){
    React.useEffect(()=>{
        localStorage.setItem("cards",JSON.stringify(cardsArray));
        localStorage.setItem("guesses",guessCount);
        localStorage.setItem("correct",correctGuesses);
        localStorage.setItem("count",count);
        localStorage.setItem("bool",bool);
        localStorage.setItem("color",themeColor);
    },[cardsArray,themeColor]);
}

//Arrays have to be strigified first before enterin
//JSON.stringify(array);
//On way back const array = JSON.parse(localStorage.getItem("array"));
//Local storage can only store string so you need to convert return values into desired type as it will return string[]