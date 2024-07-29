import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Select,FormControl} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu'
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { blue } from '@mui/material/colors';

const HomePage=()=>{
  const[Courses,setCourses]=useState([]);
  var Email=sessionStorage.getItem("InstructorEmail");
  sessionStorage.clear();
  sessionStorage.setItem("InstructorEmail",Email)
  const history=useHistory();
    useEffect(()=>{
        const {ID,CourseName, CreditHours, Instructors, Students, QuestionBanks}=queryString.parse(window.location.search);
            AllCourses({ID,CourseName, CreditHours, Instructors, Students, QuestionBanks})
            .then(res=>{
                    setCourses(res.data);
                })
                
        },[window.location.search]);
        const f= {Email: sessionStorage.getItem("InstructorEmail")}
        const AllCourses = async (query)=> await axios.post("http://localhost:8000/courses/SearchResult",f);

        const Check=(Courses)=>{
            if(Courses.length==0)
                return false;
            else
                return true;    
        };
        const handleSubmit=(CourseID)=>{
          sessionStorage.setItem("CID",CourseID)
          history.push("/AddStudents")
        };
        const handleSubmit3=(CourseID)=>{
          sessionStorage.setItem("CID",CourseID)
          history.push("/AddInstructors")
        };
        const handleSubmit1=()=>{
          history.push("/createCourse")
        };
        const ViewBank=(CourseID)=>{
          sessionStorage.setItem("CID",CourseID)
          history.push("/ViewBanks0")
        };
        const handle=(CourseID)=>{
          const f = {
            CourseID: CourseID
            }
          axios.post('http://localhost:8000/courses/delete', f )
          .then(res => toast("DELETED"))
          .then(data => window.location.reload())
          .catch(err => toast("ERROR"))
        };
        
        
    return(
<>
<Menu/>
<div className="card text-center" style={{backgroundColor:'yellowgreen', color:"white", width:"20%"}}>
  <h3>Courses</h3>
</div>
    <div className="container-fluid p-5 text-center"> 
    <ToastContainer position="top-center" />
    <div className="container-fluid p-5">
    <div>
        <FormLabel hidden={Check(Courses)}>Start creating courses</FormLabel>
    </div>
    <p>
    <Button style={{width:"16%"}} variant="contained"sx={{ mt: 3, mb: 2 }}onClick={()=>{handleSubmit1()}}>Create Course</Button>
    </p>
    <div className="row" >
      {Courses.map((f)=><div className="card border border-dark mb-3"   style={{width:"48%",marginRight:20}} key={f.id} f={f}>
  <div className="card-body">
  <Button  onClick={()=>{if(window.confirm("Confirm Delete"))handle(f._id)}}  endIcon={<HighlightOffIcon position="top-right"  style={{color:"red"}} sx={{ ml: 55 }} fontSize="large" />}></Button>
    <h5 className="card-title" style={{fontSize:50}}>{f.ID}</h5>
    <p className="card-text">
    <p  style={{fontSize:35}}>
      {f.CourseName}  
    </p>
    <p>
    <FormControl sx={{ minWidth:"70%" }}>
    <InputLabel id="demo-simple-select-label">Instructors teaching the course</InputLabel>
    <Select >
    {f.Instructors.map((f1)=><MenuItem key={f1.id} f1={f1}>{f1}</MenuItem>)}
    </Select>
    </FormControl>
    </p>
    <p>
    <FormControl sx={{ minWidth:"70%" }}>
    <InputLabel id="demo-simple-select-label">Students enrolled to the course</InputLabel>
    <Select >
    {f.Students.map((f1)=><MenuItem key={f1.id} f1={f1}>{f1}</MenuItem>)}
    </Select>
    </FormControl>
    </p>
    <p>
    <Button style={{width:"50%"}} color="warning" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{handleSubmit3(f.ID)}}>Add Instructors</Button>
    </p>
    <p>
    <Button style={{width:"50%"}} variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{handleSubmit(f.ID)}}>Add Students</Button>
    </p>
    <p>
    <Button style={{width:"50%"}} color="success" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{ViewBank(f.ID)}}>View Question Banks</Button>
    </p>
    </p>
  </div>
</div>)}
    </div>
    </div>
    </div>

</>
    )
}
export default HomePage;