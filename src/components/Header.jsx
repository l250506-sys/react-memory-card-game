import { FaBrain } from "react-icons/fa6";

export default function Header({children}){
    return(
        <header>
            <h1><FaBrain className="brain"/>{children}</h1>
        </header>
    )
}