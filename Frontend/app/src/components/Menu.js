import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import PersonIcon from '@mui/icons-material/Person';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Menu() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
        <NavLink exact to="/HomePage" className="nav-logo" >
            <HomeSharpIcon fontSize="large" style={{color:"black"}} sx={{mb:5.5}}/>
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
            <FormControl sx={{ minWidth: 150 }} size="small" variant="standard">
            <InputLabel id="demo-select-small" style={{color: 'black'}}>Assessment</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
            >
            <MenuItem>
            <NavLink
                exact
                to="/createExam"
                activeClassName="active"
                label="Create Assessment"
                className="nav-links"
                onClick={handleClick}
                style={{color: 'black'}}
            >Create Assessment</NavLink>
            </MenuItem>
            <MenuItem>
            <NavLink
                exact
                to="/postedExams"
                activeClassName="active"
                label="Posted Assessments"
                className="nav-links"
                onClick={handleClick}
                style={{color: 'black'}}
            >Posted Assessments</NavLink>
            </MenuItem>
            <MenuItem>
            <NavLink
                exact
                to="/pastExams"
                activeClassName="active"
                label="Past Assessments"
                className="nav-links"
                onClick={handleClick}
                style={{color: 'black'}}
            >Past Assessments</NavLink>
            </MenuItem>
            </Select>
            </FormControl>
            </li>
          
          <li>
            <NavLink exact to="/Profile" className="nav-item" style={{color: 'black'}}>
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

export default Menu;