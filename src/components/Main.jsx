import { ThemeContext } from "../App";
import React from "react";

export default function Main({children}){
    const current = React.useContext(ThemeContext);
    return(
        <main className={current === "dark"? null:"white"}>
                <h2>MEMORY</h2>
                {children}
            
        </main>
    )
}