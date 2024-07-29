import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';


import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu'
import Button from '@mui/material/Button';

const PastExams=()=>{
  const[Courses,setCourses]=useState([]);
  sessionStorage.removeItem("ExamName");
  sessionStorage.removeItem("Email")
  sessionStorage.removeItem("Answers")
  sessionStorage.removeItem("SImages")
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
        const handleSubmit=(ID)=>{
            sessionStorage.setItem("CourseID",ID)
            history.push("/pastExams1")
          };
    return(
<>
<Menu/>
    <div className="container-fluid p-5 text-center"> 
    <ToastContainer position="top-center" />
    <h1> Step 1: select a course
    </h1>
    <div className="container-fluid p-5">
    <div className="row" >
    {Courses.map((f)=><div className="card border border-dark mb-3"   style={{width:"48%",marginRight:20}} key={f.id} f={f}>
    <div className="card-body">
    <h5 className="card-title" style={{fontSize:37}}>{f.ID}</h5>
    <p className="card-text">
    <p style={{fontSize:23}}>
      {f.CourseName}  
    </p>
    <p>
    <Button style={{width:"50%"}} variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{handleSubmit(f.ID)}}>Next</Button>
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
export default PastExams;