import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PostedExams=()=>{
    const[Exams,setExams]=useState([]);
    useEffect(()=>{
        const {CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions}=queryString.parse(window.location.search);
            AllExams({CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions})
            .then(res=>{
                  setExams(res.data);
                })
                
        },[window.location.search]);
    const f= {Email: sessionStorage.getItem("InstructorEmail")}
    const AllExams = async (query)=> await axios.post("http://localhost:8000/exams/SearchResult",f);
    const history=useHistory();
    const Delete=(ID)=>{
        const f = {ID: ID}
          axios.post('http://localhost:8000/exams/delete', f )
          .then(res => res.data)
          .then(data => toast("DELETED"))
          .catch(err => toast("ERROR"))
      };
    const handle=(List)=>{
        var sum=0;
       for(var i=0;i<List.length;i++)
       {
           sum+=parseInt(List[i].Number);
       }
       return sum;
      };
    return(
<>
<Menu/>
<ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center"> 
    <h1> Posted Exams
        </h1>
    <div className="container-fluid p-5">
   
    <div className="row" >
      {Exams.map((f)=><div className="card border border-dark mb-3"   style={{width:"23%", marginRight:20}} key={f.id} f={f}>
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
      Grade: {f.Grade}  
    </p>
    <p>
      Date: {f.StartTime.substring(0,10)}  
    </p>
    <p>
      StartTime: {new Date(f.StartTime).toLocaleTimeString()}  
    </p>
    <p>
      End Time: {new Date(f.EndTime).toLocaleTimeString()}  
    </p>
    <p>
      Duration: {f.Duration} minutes
    </p>
    <p>
      Number Of Questions: {handle(f.listofQuestions)}
    </p>
    <p>
        <Button style={{width:"100%"}} variant="contained"  color='error'onClick={()=>{Delete(f._id)}}>Delete</Button>
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
export default PostedExams;