import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import SMenu from './SMenu'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const ThankYou=()=>{
    var Email=sessionStorage.getItem("StudentEmail");
    sessionStorage.clear();
    sessionStorage.setItem("StudentEmail",Email)
    sessionStorage.removeItem("STime")
    sessionStorage.removeItem("ETime")
    sessionStorage.removeItem("Stop")
    sessionStorage.removeItem("ExamID")
    sessionStorage.removeItem("FinalList")
return(
    <>
    <div>
    <SMenu/>
    <ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center"  style={{fontSize:"120%"}}> 
          <h2 style={{color:"red"}}>Successfully Submitted</h2>
          </div>

    </div>
    
    </>
        )
    }
    export default ThankYou;