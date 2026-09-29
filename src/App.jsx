import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Cards from "./Items/index";
import arr from "./hooks/values";
import {nanoid} from "nanoid";
import Info from "./components/info";
import Confetti from "react-confetti";
import useLocalStorage from "./hooks/useLocalStorage";

const ThemeContext = React.createContext();


export default function App(){
  function initialiseArray(){
    const array = Array(16).fill(0).map((obj,index)=>{
      const newObj = {
        value:arr[index],
        open:false,
        id:nanoid(),
        disabled:false
      };
      return newObj
    }
    ).sort(()=> Math.random()-0.5);
    return array;
  };

  function getArray(){
    const storedArray = JSON.parse(localStorage.getItem("cards"));
    return storedArray? storedArray : initialiseArray();
  }


  const [cardsArray,setCardsArray] = React.useState(getArray);

  let countOpen = React.useRef(Number(localStorage.getItem("count"))|| 0);

  let guessCount = React.useRef(Number(localStorage.getItem("guesses"))|| 0); //Refs cant take call back functions 

  let correctGuesses = React.useRef(Number(localStorage.getItem("correct"))|| 0);

  let [themeColor,setThemeColor] = React.useState(localStorage.getItem("color")||"dark");
  console.log(localStorage.getItem("color"));

  function retrieveGameEnd(){
    if(localStorage.getItem("bool") && localStorage.getItem("bool") === "true"){
      return true;
    }
    return false
  }

  let gameEnd = React.useRef(retrieveGameEnd());

  const newRef = React.useRef(null);

  function showCard(id){
    guessCount.current++;
    setCardsArray(prevArray=>{
      let disabledCount = 0;
      if(countOpen.current!==2){
        prevArray.forEach(obj =>{
          if(obj.disabled){
            disabledCount++;
          }
        })
        console.log(disabledCount);
        if(disabledCount === 14){
          gameEnd.current = true;
          correctGuesses.current = 16
          return prevArray.map(obj =>{
            return {
              ...obj,
              disabled:true,
              open:false
            }
          })
        }
        return prevArray.map(obj=>{
          if(obj.id===id){
            countOpen.current++;
            return{
              ...obj,
              open:true
            }
          }else{
            return obj
          }
        })
      }else{
        countOpen.current = 1;
        const openArray=[];
        prevArray.forEach(obj =>{
          if(obj.open &&!obj.disabled){
            openArray.push(obj);
          }
        }
        )
        return prevArray.map(obj=>{
          let newObj = obj;
          console.log(openArray);
          if(openArray[0].value === openArray[1].value && openArray.includes(obj)){
            correctGuesses.current++;
            newObj ={
              ...obj,
              open:false,
              disabled:true
            }
          }else if(obj.open && !obj.disabled){
            newObj = {
              ...obj,
              open:false
            }
          }else if(obj.id === id){
            newObj = {
              ...obj,
              open:true
            }
          }
          return newObj;
        })
      }
      
    }) 
  }

  function startNew(){
    gameEnd.current = false;
    guessCount.current = 0;
    correctGuesses.current = 0;
    countOpen.current = 0;
    setCardsArray(initialiseArray)
  }

  function darkClicked(){
    setThemeColor("dark")
  }

  function lightClicked(){
    setThemeColor("light");
  }

  React.useEffect(()=>{
    if(newRef.current){
      newRef.current.scrollIntoView();
      newRef.current.focus();
    }
  },[gameEnd.current]);

  useLocalStorage(cardsArray,guessCount.current,correctGuesses.current,countOpen.current,gameEnd.current,themeColor);

  
  return(
    <ThemeContext.Provider value={themeColor}>
      {gameEnd.current && <Confetti/>}
      <Header>
        Memory Card Game
      </Header>
      <Main>
        <Cards>
          {cardsArray.map((obj,index) =>
            <Cards.SingleCard key={index} id={obj.id} value = {obj.value} open ={obj.open} onClick={()=> showCard(obj.id)} disabled = {obj.disabled}></Cards.SingleCard>
          )}
        </Cards>
        <Info correctGuesses={correctGuesses.current} guessCount={guessCount.current}/>
        {gameEnd.current && <button className="new-game" onClick={startNew} ref={newRef}>New Game</button>}
        <div className="dark-light">
          <button className="dark" onClick={darkClicked}>Dark</button>
          <button className="light" onClick={lightClicked}>Light</button>
        </div>
      </Main>
    </ThemeContext.Provider>
  )
}

export {ThemeContext};