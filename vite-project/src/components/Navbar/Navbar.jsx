 import {Link}   from "react-router-dom";

 import "./Navbar.css"
export default function Navbar()
    {
        return(
            <>
            <nav>
                <h1>LOGO</h1>
                
                <ul className="back">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>

                </ul>
            </nav>
            
            </>
  
        )
    }

