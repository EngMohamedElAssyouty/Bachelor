import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastHeader } from 'react-bootstrap';
import SMenu from './SMenu'
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { fontSize } from '@mui/system';
import { stringify } from 'querystring';

const StudentExams=()=>{
    const[Exams,setExams]=useState([]);
    useEffect(()=>{
        const {CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions}=queryString.parse(window.location.search);
            AllExams({CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions})
            .then(res=>{
                  setExams(res.data);
                })
                
        },[window.location.search]);
    const f= {Email: sessionStorage.getItem("StudentEmail")}
    const AllExams = async (query)=> await axios.post("http://localhost:8000/exams/SearchResult2",f);
    const history=useHistory();

    const Che=(Exams)=>{
      if(Exams.length==0)
        return false;
      else
        return true;  
    };

    const handle=(List)=>{
        var sum=0;
       for(var i=0;i<List.length;i++)
       {
           sum+=parseInt(List[i].Number);
       }
       return sum;
      };

      const Check=(ExamID,StartTime,EndTime)=>{
        console.log(Number(new Date()))
        console.log(Number(new Date(EndTime)))
        console.log(Number(new Date(StartTime)))
        if(Number(new Date())<=Number(new Date(EndTime))&& Number(new Date())>=Number(new Date(StartTime)))
        {
            if(localStorage.getItem("Finished "+ExamID+sessionStorage.getItem("StudentEmail"))==undefined)
              return false
            else
            {
              return true
            }
        }
        else
        {
            return true;
        }
      };
      const handleCheck=(ExamID)=>{
      if(localStorage.getItem("Finished "+ExamID+sessionStorage.getItem("StudentEmail"))==undefined)
        return "No"
      else
        return "Yes"

      };
      
    const handleSubmit=(ExamID,CourseID,ExamName,Type,Grade,StartTime,EndTime,Duration,listofQuestions,AllQuestions)=>{
      if(localStorage.getItem("flag "+ExamID+sessionStorage.getItem("StudentEmail"))!=true)
      {
          var AnsList=[];
          var FinalList=[];
          for(var i=0;i<listofQuestions.length;i++)
          {
              for(var j=0;j<listofQuestions[i].Number;j++)
              {
                  if(listofQuestions[i].Level=="Easy")
                  {
                      var r=AllQuestions.length-(((AllQuestions.length/3)-(listofQuestions[i].QuestionBank-1))*3)
                  }
                  if(listofQuestions[i].Level=="Medium")
                  {
                      var r=AllQuestions.length-(((AllQuestions.length/3)-(listofQuestions[i].QuestionBank-1))*3)+1   
                  }
                  if(listofQuestions[i].Level=="Hard")
                  {
                      var r=(AllQuestions.length-(((AllQuestions.length/3)-(listofQuestions[i].QuestionBank-1))*3))+2
                  }
                  var temp=Math.floor((Math.random()*(AllQuestions[r].length)));
                  var test={Question:(AllQuestions[r])[temp].Question,  image:(AllQuestions[r])[temp].image,  fimage:(AllQuestions[r])[temp].fimage,  simage:(AllQuestions[r])[temp].simage,  timage:(AllQuestions[r])[temp].timage,  foimage:(AllQuestions[r])[temp].foimage,  Type:(AllQuestions[r])[temp].Type,Grade:listofQuestions[i].Grade/listofQuestions[i].Number,CSolution:(AllQuestions[r])[temp].CSolution,WSolution1:(AllQuestions[r])[temp].WSolution1,WSolution2:(AllQuestions[r])[temp].WSolution2,WSolution3:(AllQuestions[r])[temp].WSolution3}
                  var flag=true;
                  while(flag)
                  {
                    for(var z=0;z<FinalList.length;z++)
                    {
                      if(FinalList[z].Question==test.Question && FinalList[z].image==test.image)
                      {
                        temp=Math.floor((Math.random()*(AllQuestions[r].length)));
                        test={Question:(AllQuestions[r])[temp].Question,  image:(AllQuestions[r])[temp].image,  fimage:(AllQuestions[r])[temp].fimage,  simage:(AllQuestions[r])[temp].simage,  timage:(AllQuestions[r])[temp].timage,  foimage:(AllQuestions[r])[temp].foimage,  Type:(AllQuestions[r])[temp].Type,Grade:listofQuestions[i].Grade/listofQuestions[i].Number,CSolution:(AllQuestions[r])[temp].CSolution,WSolution1:(AllQuestions[r])[temp].WSolution1,WSolution2:(AllQuestions[r])[temp].WSolution2,WSolution3:(AllQuestions[r])[temp].WSolution3}
                        flag=false;
                      }
                    }
                    if(flag==false)
                    {
                      flag=true
                    }
                    else
                    {
                      flag=false
                    }
                  }
                  FinalList.push({Question:(AllQuestions[r])[temp].Question,  image:(AllQuestions[r])[temp].image,  fimage:(AllQuestions[r])[temp].fimage,  simage:(AllQuestions[r])[temp].simage,  timage:(AllQuestions[r])[temp].timage,  foimage:(AllQuestions[r])[temp].foimage,  Type:(AllQuestions[r])[temp].Type,Grade:listofQuestions[i].Grade/listofQuestions[i].Number,CSolution:(AllQuestions[r])[temp].CSolution,WSolution1:(AllQuestions[r])[temp].WSolution1,WSolution2:(AllQuestions[r])[temp].WSolution2,WSolution3:(AllQuestions[r])[temp].WSolution3});
                  AnsList.push({Question:(AllQuestions[r])[temp].Question,QAnswer:(AllQuestions[r])[temp].QAnswer,Grade:listofQuestions[i].Grade/listofQuestions[i].Number,Answer:"",image:(AllQuestions[r])[temp].image});
              }
          }
          if(localStorage.getItem("flag "+ExamID+sessionStorage.getItem("StudentEmail"))==undefined)
          {          
            const f = {
            CourseID:CourseID,
            ExamID:ExamID,
            ExamName:ExamName,
            Type:Type,
            Grade:Grade,
            StudentEmail:sessionStorage.getItem("StudentEmail"),
            StudentGrade:-1,
            AllAnswers:AnsList,
            StudentImage:[]
            }
            axios.post('http://localhost:8000/pastExams/create', f )
            .then(res => res.data)
            .then(data => "SUCCESSFULLY Created")
            .catch(err => "ERROR PLEASE TRY AGAIN")
          }
        localStorage.setItem("flag "+ExamID+sessionStorage.getItem("StudentEmail"),true)
        sessionStorage.setItem("FinalList",JSON.stringify(FinalList))
        localStorage.setItem("AnsList",JSON.stringify(AnsList))
        sessionStorage.setItem("ExamID",ExamID)
        sessionStorage.setItem("STime",JSON.stringify(StartTime))
        sessionStorage.setItem("ETime",JSON.stringify(EndTime))

        sessionStorage.setItem("CourseID",CourseID)
        sessionStorage.setItem("ExamName",ExamName)
        sessionStorage.setItem("Type",Type)
        sessionStorage.setItem("Grade",Grade)
        sessionStorage.setItem("StudentImage",JSON.stringify([]))
        sessionStorage.setItem("start","No")
        history.push("/StartExam")        
      }
    };
    return(
<>
<SMenu/>
<ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center"> 
    <h1> Upcoming Assessments
        </h1>
    <div className="container-fluid p-5">
    <div>
        <FormLabel hidden={Che(Exams)}>No upcoming assessments</FormLabel>
    </div>
    <div className="row" >
      {Exams.map((f)=><div className="card border border-dark mb-3"   style={{width:"32%",marginRight:10}} key={f.id} f={f}>

  <div className="card-body">
    <h5 className="card-title" style={{fontSize:37}}>{f.CourseID}</h5>
    <p className="card-text">
    <p style={{fontSize:23}}>
      {f.CourseID}  
    </p>
    <p>
      Type: {f.Type}  
    </p>
    <p>
      Grade: {f.Grade}  
    </p>
    <p>
      {f.StartTime.substring(0,10)}  
    </p>
    <p>
      {f.Duration} minutes
    </p>
    <p style={{fontSize:30, color:"red"}}>
      StartTime: {new Date(f.StartTime).toLocaleTimeString()}  
    </p>
    <p style={{fontSize:30 , color:"red"}}>
      End Time: {new Date(f.EndTime).toLocaleTimeString()}  
    </p>
    <p>
      Submitted: {handleCheck(f._id)}  
    </p>
    <p>
       <Button style={{width:"100%"}} variant="contained" disabled={Check(f._id,f.StartTime,f.EndTime)} color='warning'onClick={()=>{handleSubmit(f._id,f.CourseID,f.ExamName,f.Type,f.Grade,f.StartTime,f.EndTime,f.Duration,f.listofQuestions,f.AllQuestions)}}>Start Exam</Button>
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
export default StudentExams;