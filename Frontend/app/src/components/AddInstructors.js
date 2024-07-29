import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddInstructors=()=>{
    const[Instructors,setInstructors]=useState([]);
    const[Search,setSearch]=useState("");
    const history=useHistory();

    var CourseID=sessionStorage.getItem("CID");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        const {Password, FirstName, LastName, Address,Email,Gender,Type}=queryString.parse(window.location.search);
            AllInstructors({Password, FirstName, LastName, Address,Email,Gender,Type})
            .then(res=>{
                    setInstructors(res.data);
                })
                
        },[window.location.search]);
        const f= {Email: sessionStorage.getItem("InstructorEmail"),Name:sessionStorage.getItem("name")}
        const AllInstructors = async (query)=> await axios.post("http://localhost:8000/instructors/SearchResult",f);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSubmit=(Email,FirstName,LastName)=>{
        const f = {
            ID:CourseID,
            Email:Email
            }
            console.log(f);
            axios.post('http://localhost:8000/instructors/update', f )
            .then(res => res.data)
            .then(data => "EMAILS ARE ADDED")
            .catch(err => toast("SOME EMAILS DOES NOT EXIST"))

            const f1 = {
                Email:Email,
                CourseID:CourseID
                }
                console.log(f);
                axios.post('http://localhost:8000/courses/findandupdate', f1 )
                .then(res => res.data)
                .then(data => "EMAILS ARE ADDED")
                .catch(err => toast("SOME EMAILS DOES NOT EXIST"))

        toast("Instructor "+FirstName+" "+LastName+" with the Email: "+Email+" is added to the course.")
    };
      const handleSubmit4=(Search)=>{
          sessionStorage.setItem("name",Search);
          window.location.reload();
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
    <h3>Add Instructors</h3>
    </div>
    </div>
          <form>
          <TextField
            margin="normal"
            required
            style={{width:"87%",marginRight:20,marginTop:50}}
            label="Search instructor by name"
            autoComplete="Search"
            autoFocus
            value={Search}
            onChange={(event)=>setSearch(event.target.value)}/>
            <Button style={{width:"11%",marginTop:68}} variant="contained" color='primary'onClick={()=>{handleSubmit4(Search)}}>Search</Button>

        <div className="row" >
            {Instructors.map((f)=><div className="card border border-dark mb-3" style={{width:"23%",marginRight:20, marginTop:30 }} key={f.id} f={f}>
            <div className="card-body">
            <h5 className="card-title">Instructor</h5>
            <p className="card-text">
            <p>
                First Name: {f.FirstName}  
            </p>
            <p>
                Last Name: {f.LastName}
            </p>
            <p>
                 Email: {f.Email}
            </p>
            <p>
                <Button style={{width:"100%"}} variant="contained"  onClick={()=>{handleSubmit(f.Email,f.FirstName,f.LastName)}}>Add Instructor</Button>
            </p>
            </p>
            </div>
            </div>)}
        </div>
          </form>
        </div>
    
    </>
        )
    }
    export default AddInstructors;