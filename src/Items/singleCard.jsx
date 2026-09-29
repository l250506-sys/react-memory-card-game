import clsx from "clsx";
import React from "react";
import { ThemeContext } from "../App";
export default function SingleCard({value,id,onClick,open,disabled}){
    function listClicked(){
        if(disabled || open){
            return
        }
        onClick(id);
    }

    const current = React.useContext(ThemeContext);

    const listClass = clsx({
        "lightLi":current==="light",
        "show":open && !disabled,
        "hide":!open,
        "disabled":disabled
    })

    
    return(
        <li onClick={listClicked} className={listClass}>{value}</li>
    )
}