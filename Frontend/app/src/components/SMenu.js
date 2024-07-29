import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import PersonIcon from '@mui/icons-material/Person';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

function SMenu() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
        <NavLink exact to="/SHomePage" className="nav-logo" >
        <HomeSharpIcon fontSize="large" style={{color:"black"}} sx={{mb:5.5}}/>
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item" style={{marginTop:15}}>
              <NavLink
                exact
                style={{color: 'black'}}
                to="/Transcript"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Transcript
              </NavLink>
            </li>
          <li>
            <NavLink exact to="/MyProfile" className="nav-item" style={{color: 'black'}}>
            <PersonIcon fontSize="large" style={{color:"black"}} sx={{mt:2}}/>
            <i className="fas fa-code"></i>
          </NavLink>
            </li>
            </ul>
        </div>
      </nav>
    </>
  );
}

export default SMenu;