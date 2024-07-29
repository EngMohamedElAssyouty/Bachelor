import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SMenu from './SMenu'
import FormLabel from '@mui/material/FormLabel';

const Transcript=()=>{
    const[pastExams,setpastExams]=useState([]);
    useEffect(()=>{
        const {CourseID,ExamID, ExamName, Type, Grade,StudentEmail,StudentGrade,AllAnswers}=queryString.parse(window.location.search);
            AllPastExams({CourseID,ExamID, ExamName, Type, Grade,StudentEmail,StudentGrade,AllAnswers})
            .then(res=>{
                setpastExams(res.data);
                })
                
        },[window.location.search]);
    const f= {Email: sessionStorage.getItem("StudentEmail")}
    const AllPastExams = async (query)=> await axios.post("http://localhost:8000/Pastexams/SearchResult",f);

    const Che=(PastExams)=>{
        if(PastExams.length==0)
          return false;
        else
          return true;  
      };
    const Check=(SGrade)=>{
        if(SGrade==-1)
        {
          return "";
        }
        else
        {
          return SGrade;
        }
      };
    return(
<>
<SMenu/>
<ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center"> 
    <h1> Transcript 
    </h1>
    <div className="container-fluid p-5">
    <div>
        <FormLabel hidden={Che(pastExams)}>No past exams</FormLabel>
    </div>
    <div className="row" >
      {pastExams.map((f)=><div className="card border border-dark mb-3"   style={{width:"24%",background:"black",color:"white",marginRight:10}} key={f.id} f={f}>

  <div className="card-body">
    <h5 className="card-title" style={{fontSize:37}}>{f.CourseID}</h5>
    <p className="card-text">
    <p style={{fontSize:23}}>
      {f.ExamName}  
    </p>
    <p>
      Type: {f.Type}  
    </p>
    <p>
      Grade: {Check(f.StudentGrade)}/{f.Grade}  
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
export default Transcript;