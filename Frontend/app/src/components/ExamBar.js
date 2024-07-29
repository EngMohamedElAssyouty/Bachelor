import React from "react";
import axios from 'axios';
import "./Menu.css";

function ExamBar() {

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
        <div className="nav-vert">
        <br></br><br></br><br></br>
            Start Time:{new Date(JSON.parse(sessionStorage.getItem("STime"))).toLocaleTimeString()}<br></br>
            End Time:{new Date(JSON.parse(sessionStorage.getItem("ETime"))).toLocaleTimeString()}<br></br>
            Current Time<p id="demo"style={{color:"red"}} ></p>
        </div>
        </div>
      </nav>
      
    </>
  );
}
setInterval(function () {
  
    if(sessionStorage.getItem("ETime")!=undefined)
    {
    const d = new Date();
    var d1 = new Date(JSON.parse(sessionStorage.getItem("ETime")));
    if(Number(d)>=Number(d1))
    {
        window.location="/ThankYou"
        sessionStorage.setItem("Stop",true)
        d1=0;
    }
    if(document.getElementById("demo")!=undefined)
    {
      document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    }
    
}
}, 1000);

export default ExamBar;