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


var Emails=[]
var total="Instructors Added: "

const AddCourse=()=>{
    const[ID,setID]=useState("");
    const[CourseName,setCourseName]=useState("");
    const[CreditHours,setCreditHours]=useState("");
    const[Instructors,setInstructors]=useState([]);
    const[Search,setSearch]=useState("");
    const history=useHistory();

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
        if(!(Emails.includes(Email)))
                Emails.push(Email);

        var result="Instructors Added: "
        if(Emails.length!=0){
            var m12=Emails[0]+"";
            for(var i=1;i<Emails.length;i++)
            {
                m12=m12+","+Emails[i];
            }
            result+=m12;
        }
        total=result
        toast("Instructor "+FirstName+" "+LastName+" with the Email: "+Email+" is added to the course.")
    };
    const handleSubmit1=(Email,FirstName,LastName)=>{
        var temp=[]
        for(var i=0;i<Emails.length;i++)
        {
            if(Emails[i]!=Email)
                temp.push(Emails[i]);
        }
        Emails=temp;
        var result="Instructors Added: "
      if(Emails.length!=0){
        var m12=Emails[0]+"";
        for(var i=1;i<Emails.length;i++)
        {
          m12=m12+","+Emails[i];
        }
        result+=m12;
      }
      total=result
      toast("Instructor "+FirstName+" "+LastName+" with the Email: "+Email+" is removed from the course.")

      };
      const handleSubmit2=()=>{
          if(total=="Instructors Added: ")
          {
              toast("No Instructors added")
          }
          else{
              toast(total)
          }
      };
      const handleSubmit3=()=>{
        if(ID!=="" &&CourseName!=""&&CreditHours!="")  
        {
            Emails.push(sessionStorage.getItem("InstructorEmail"))
            const f = {
                ID: ID,
                CourseName: CourseName,
                CreditHours: CreditHours,
                Instructors: Emails,
                Students:[],
                QuestionBanks:0
                }
                console.log(f);
                axios.post('http://localhost:8000/courses/add', f )
                .then(res => res.data)
                .then(data => toast("SUCCESSFULLY ADDED"))
                .catch(err => toast("ERROR PLEASE TRY AGAIN"))

                for(var i=0;i<Emails.length;i++)
                {
                  const f = {
                    ID: ID,
                    Email: Emails[i]
                    }
                    console.log(f);
                    axios.post('http://localhost:8000/instructors/update', f )
                    .then(res => res.data)
                    .then(data => "Done")
                    .catch(err => "Error")
                }
                history.push(`/HomePage`);
        }
        else{
            toast("Fill in all reuired data")
        }
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
          <h2>Create Course</h2>
          <form>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Course ID"
            autoComplete="id"
            autoFocus
            value={ID}
            onChange={(event)=>setID(event.target.value)}/>

            <TextField
            margin="normal"
            required
            fullWidth
            label="Course Name"
            autoComplete="courseName"
            autoFocus
            value={CourseName}
            onChange={(event)=>setCourseName(event.target.value)}/>

            <TextField
            margin="normal"
            required
            fullWidth
            label="Credit Hours"
            autoComplete="creditHours"
            autoFocus
            type="number"
            value={CreditHours}
            onChange={(event)=>setCreditHours(event.target.value)}/>

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
            <p>
                <Button style={{width:"100%"}} variant="contained" color="error" onClick={()=>{handleSubmit1(f.Email,f.FirstName,f.LastName)}}>Remove Instructor</Button>
            </p>
            </p>
            </div>
            </div>)}
        </div>
        <p>
            <Button style={{width:"21.2%"}} variant="contained"  sx={{ ml: "38.8%"}} onClick={()=>{handleSubmit2()}}>Check Instructors</Button>
        </p>
        <p>
            <Button fullWidth variant="contained"sx={{ mt: 1, mb: 1 }} color="success"onClick={()=>{handleSubmit3()}}>Create Course</Button>
        </p>
          </form>
        </div>
    
    </>
        )
    }
    export default AddCourse;