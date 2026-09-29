import React from "react"
import { ThemeContext } from "../App"

export default function Info({guessCount,correctGuesses}){
    const current = React.useContext(ThemeContext);

    return(
        <div className={current==="dark"?"info":"info light"}>
            <div className="guess-div">
                <h2>Guesses</h2>
                <p>{guessCount}</p>
            </div>
            <div className="correct-guess-div">
                <h2>Correct Guesses</h2>
                <p>{correctGuesses}</p>
            </div>
        </div>
    )
}