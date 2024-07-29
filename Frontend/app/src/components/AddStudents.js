import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Menu from "./Menu";
import { TextField,Button } from '@mui/material';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddStudents=()=>{
    const[Email,setEmail]=useState("");
    var CourseID=sessionStorage.getItem("CID");
    const history=useHistory();
    const handleSubmit=()=>{
        var listOfStudents=Email.split(",")
        const f = {
            listOfStudents:listOfStudents,
            CourseID:CourseID
            }
            console.log(f);
            axios.post('http://localhost:8000/students/findandupdate', f )
            .then(res => res.data)
            .then(data => toast("EMAILS ARE ADDED"))
            .catch(err => toast("SOME EMAILS DOES NOT EXIST"))
        history.push(`/HomePage`);
    };
    return(
<>
<div>
  <Menu/>
  <ToastContainer position="top-center" />
  <div className="row" style={{marginBottom:"50px"}}>
  <div className="card text-center" style={{backgroundColor:'blue', color:"white", width:"20%",marginRight:20}}>
  <h3>{CourseID}</h3>
</div>
<div className="card text-center" style={{backgroundColor:'red', color:"white", width:"20%"}}>
  <h3>Add Students</h3>
</div>
</div>
      <form>
      <div className="Card">
          
      <TextField
            margin="normal"
            required
            fullWidth
            label="Students Emails (Seperated with comma's)"
            autoComplete="creditHours"
            autoFocus
            value={Email}
            onChange={(event)=>setEmail(event.target.value)}/>  
        </div>
        <p>
            <Button fullWidth variant="contained"sx={{ mt: 1, mb: 1 }} color="success"onClick={()=>{handleSubmit()}}>Add Students</Button>
        </p>
      </form>
    </div>

</>
    )
}
export default AddStudents;