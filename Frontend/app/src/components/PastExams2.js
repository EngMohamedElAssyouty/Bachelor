import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu'
import Button from '@mui/material/Button';

const PastExams2=()=>{
    const[pastExams,setpastExams]=useState([]);
    useEffect(()=>{
        const {CourseID,ExamID, ExamName, Type, Grade,StudentEmail,StudentGrade,AllAnswers}=queryString.parse(window.location.search);
            AllPastExams({CourseID,ExamID, ExamName, Type, Grade,StudentEmail,StudentGrade,AllAnswers})
            .then(res=>{
                setpastExams(res.data);
                })
                
        },[window.location.search]);
    const f= {CourseID: sessionStorage.getItem("CourseID"),ExamName:sessionStorage.getItem("ExamName")}
    const AllPastExams = async (query)=> await axios.post("http://localhost:8000/Pastexams/SearchResult2",f);
    const history=useHistory();
    const handleSubmit0=(Email,Images)=>{
      sessionStorage.setItem("Email",Email)
      sessionStorage.setItem("SImages",JSON.stringify(Images))
      history.push("/pastExams4")
    };
    const CheckGrade=(SGrade)=>{
      if(SGrade!=-1)
        return SGrade
    }
    const handleSubmit=(Email,Answers,Grade)=>{
      sessionStorage.setItem("Email",Email)
      sessionStorage.setItem("Answers",JSON.stringify(Answers))
      var GradeList=[]
      var sum=0;
      for(var i=0;i<Answers.length;i++)
      {
        if(Answers[i].QAnswer!=undefined)
        {
          if(Answers[i].Answer==Answers[i].QAnswer)
          {
            GradeList.push({Grade:Answers[i].Grade})
            sum=sum+Answers[i].Grade
          }
          else
            GradeList.push({Grade:0})
        }
        else
          GradeList.push({Grade:-1})
      }
      sessionStorage.setItem("SumGrade",sum)
      sessionStorage.setItem("examGrade",Grade)
      sessionStorage.setItem("GradeList",JSON.stringify(GradeList))
      history.push("/pastExams3")
    };
    return(
<>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" style={{marginBottom:20}}>
    <Button className="card text-center" style={{backgroundColor:'blue', color:"white", width:"18%",marginRight:23,textTransform:'none'}} onClick={()=>{history.push("/pastExams1")}}>
      <h3>{sessionStorage.getItem("CourseID")}</h3>
    </Button>
    <div className="card text-center" style={{backgroundColor:'orange', color:"white", width:"18%",marginRight:23}}>
      <h3>{sessionStorage.getItem("ExamName")}</h3>
    </div>
    </div>
    <div className="container-fluid p-5 text-center"> 
    <div className="container-fluid p-5">
   
    <div className="row" >
      {pastExams.map((f)=><div className="card border border-dark mb-3" style={{width:"32.4%",marginRight:10}}  key={f.id} f={f}>

  <div className="card-body">
    <p className="card-text">
    <h4>
      {f.StudentEmail}  
    </h4>
    <p>
      {f.Type}  
    </p>
    <p>
      Grade: {CheckGrade(f.StudentGrade)}/{f.Grade}  
    </p>
    <p>
        <Button style={{width:"70%"}} variant="contained"  color='primary'onClick={()=>{handleSubmit0(f.StudentEmail,f.StudentImage)}}>Snapshots</Button>
    </p>
    <p>
        <Button style={{width:"100%"}} variant="contained"  color='success'onClick={()=>{handleSubmit(f.StudentEmail,f.AllAnswers,f.Grade)}}>Mark Assessment</Button>
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
export default PastExams2;