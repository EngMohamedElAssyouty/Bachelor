import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox } from '@mui/material';

const PastExams1=()=>{
    const[Exams,setExams]=useState([]);
    sessionStorage.removeItem("Email")
    sessionStorage.removeItem("Answers")
    sessionStorage.removeItem("SImages")
    useEffect(()=>{
        const {CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions}=queryString.parse(window.location.search);
            AllExams({CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions})
            .then(res=>{
                  setExams(res.data);
                })
                
        },[window.location.search]);
    const f= {CourseID: sessionStorage.getItem("CourseID")}
    const AllExams = async (query)=> await axios.post("http://localhost:8000/exams/SearchResult3",f);
    const history=useHistory();
    const handleSubmit=(ExamName)=>{
        sessionStorage.setItem("ExamName",ExamName)
        history.push("/pastExams2")
    };
    const Check=(Exams)=>{
        if(Exams.length==0)
            return false;
        else
            return true;    
    };
    return(
<>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" style={{marginBottom:20}}>
    <div className="card text-center" style={{backgroundColor:'blue', color:"white", width:"18%",marginRight:23}}>
      <h3>{sessionStorage.getItem("CourseID")}</h3>
    </div>
    </div>
    <div className="container-fluid p-5 text-center"> 
    <h1> Step 2
    </h1>
    <h5 hidden={Check(Exams)}>No assesments created for this course</h5>
    <div className="container-fluid p-5">
   
    <div className="row" >
      {Exams.map((f)=><div className="card border border-dark mb-3"   style={{width:"23%",marginRight:20}} key={f.id} f={f}>
  <div className="card-body">
  <h5 className="card-title" style={{fontSize:37}}>{f.ExamName}</h5>
    <p className="card-text">
    <p style={{fontSize:23}}>
        Type: {f.Type}  
    </p>
    <p>
        <Button style={{width:"100%"}} variant="contained"  color='primary'onClick={()=>{handleSubmit(f.ExamName)}}>Next</Button>
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
export default PastExams1;