import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Gmail from './Gmail.png'
import ProfilePic from './ProfilePic.png'

const MyProfile=()=>{
    const[Student,setStudent]=useState([]);
    var Email=sessionStorage.getItem("StudentEmail");
    sessionStorage.clear();
    sessionStorage.setItem("StudentEmail",Email)
    const history=useHistory();
    useEffect(()=>{
        const {Password, First, Last, Address,Email,Gender,Type}=queryString.parse(window.location.search);
            AllStudents({Password, First, Last, Address,Email,Gender,Type})
            .then(res=>{
              setStudent(res.data);
                })
                
        },[window.location.search]);
        const f = {Email: sessionStorage.getItem("StudentEmail")}
        const AllStudents = async (query)=> await axios.post("http://localhost:8000/students/SearchResult2",f);
return(
    <>
    <Menu/>
    <ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center">
    <div className="card mb-3"   style={{width:"51%", marginLeft:290}}>
    <div className="card-body">
    <p className="card-text">
    <div className="container-fluid p-5 text-center">
    <img src={ProfilePic} alt="..." width="230px" height="200px"/>
    <h1>
        {Student.FirstName} {Student.LastName}
    </h1>
    </div>
    </p>
    </div>
    </div>
    <div className="card mb-3"   style={{width:"51%",marginLeft:290}}>
    <div className="card-body">
    <p className="card-text">
    <div className="container-fluid p-5 text-center">
    <h2>
    <img src={Gmail} alt="..." width="130px" height="100px"/>{Student.Email} 
    </h2>
    </div>
    </p>
    </div>
    </div>

    <p>
      <Button style={{width:"10%"}} variant="contained"  color='error'onClick={()=>{history.push("/")}}>Log out</Button>
    </p>
    </div>
    </>
        )
    }
    export default MyProfile;