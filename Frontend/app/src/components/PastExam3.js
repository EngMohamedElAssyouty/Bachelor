import axios from 'axios';
import React from 'react';
import {useHistory} from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PastExams3=()=>{
    var Answers=JSON.parse(sessionStorage.getItem("Answers"))
    var GradeList=JSON.parse(sessionStorage.getItem("GradeList"))
    const history=useHistory();
    const CheckAnswer=(Answer,QAnswer)=>{
      if(Answer==QAnswer)
      {
        return "Correct"
      }
      else
      {
        return "Wrong";
      }
    };
    const CheckQAnswer=(QAnswer)=>{
      if(QAnswer==undefined)
      {
        return false
      }
      else
      {
        return true;
      }
    };
    const CheckImage=(answer)=>{
      var yes =localStorage.getItem(answer)
      if(yes!=undefined)
      {
        return true
      }
      else
      {
        return false;
      }
    };
    const CheckImage1=(answer)=>{
      var yes =localStorage.getItem(answer)
      if(yes!=undefined)
      {
        return false;
      }
      else
      {
        return true;
      }
    };
    const CheckPreview=(image)=>{
        var recentImageDataUrl =localStorage.getItem(image)
        if(recentImageDataUrl&& image!=0)
        {
          return recentImageDataUrl
        }
        return 0
      };
      const CheckPreviewYes=(image)=>{
        if(image==0)
        {
          return true
        }
        else{
          return false
        }
      };
    const Check=(index)=>{
        if(GradeList[index].Grade==-1)
            return ""
        else{
            return GradeList[index].Grade
        }
    };
    const setMark=(grade,QGrade,index)=>{
        if(grade>QGrade)
        {
            GradeList[index].Grade=-1;
            toast("The mark cannot exceed the question's grade please change")
        }
        else{
            if(grade=="")
                GradeList[index].Grade=-1;
            else
                GradeList[index].Grade=parseFloat(grade);
        }
    };
    const handleSubmit=()=>{
        var flag=true;
        for(var i=0;i<GradeList.length;i++)
        {
            if(GradeList[i].Grade==-1)
            {
                flag=false;
                toast("Question "+(i+1)+" is still not graded")
            }
        }

        if(flag)
        {
            const f = {
                CourseID:sessionStorage.getItem("CourseID"),
                ExamName:sessionStorage.getItem("ExamName"),
                StudentEmail:sessionStorage.getItem("Email"),
                GradeList:GradeList
                }
                axios.post('http://localhost:8000/pastExams/update', f )
                .then(res => res.data)
                .then(data => "Done")
                .catch(err => "Error")
            toast("Successfully Updated")
            history.push("/pastExams2")
        }
    };
    return(
<>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" style={{marginBottom:20}}>
    <Button className="card text-center" style={{backgroundColor:'blue', color:"white", width:"18%",marginRight:23,textTransform:'none'}} onClick={()=>{history.push("/pastExams1")}}>
      <h3>{sessionStorage.getItem("CourseID")}</h3>
    </Button>
    <Button className="card text-center" style={{backgroundColor:'orange', color:"white", width:"18%",marginRight:23,textTransform:'none'}} onClick={()=>{history.push("/pastExams2")}}>
      <h3>{sessionStorage.getItem("ExamName")}</h3>
    </Button>
    <div className="card text-center" style={{backgroundColor:'black', color:"white", width:"58.5%",marginRight:23}}>
      <h3>{sessionStorage.getItem("Email")}</h3>
    </div>
    </div>
    <div className="card text-center" style={{backgroundColor:'purple', color:"white", width:"40%",marginLeft:390}}>
      <h3>Self Marked Grade: {sessionStorage.getItem("SumGrade")}/{sessionStorage.getItem("examGrade")}</h3>
    </div>
    <div className="container-fluid p-5 text-center"> 
    <div className="container-fluid p-5">
    <p>
    <Button style={{width:"100%"}} variant="contained"sx={{ mt: 1, mb: 1 }} color="success" onClick={()=>{handleSubmit()}}>Update</Button>
    </p>
    <div className="row" >
      {Answers.map((f)=><div className="card border border-dark mb-3" style={{width:"48%",marginRight:20}} key={f.id} f={f}>
  <div className="card-body">
    <p className="card-text">
    <h3>Question {Answers.indexOf(f)+1}</h3>
    <p>
    <label style={{fontSize:22,whiteSpace:"pre-wrap"}}>{f.Question}</label>
    </p>
    <p>
    <img id="imgPreview1" src={CheckPreview(f.image)} hidden={CheckPreviewYes(f.image)} width="70%" height="100%"alt='Preview'/>
    </p>
    <p hidden={CheckImage1(f.Answer)}>
      Answer
      <p>
        <img id="imgPreview2" src={localStorage.getItem(f.Answer)} width="70%" height="100%"alt='Preview'/>
      </p>
    </p>
    <p hidden={CheckImage(f.Answer)}>
      Answer: {f.Answer}  
    </p>
    <h3 hidden={!CheckQAnswer(f.QAnswer)}>{CheckAnswer(f.Answer,f.QAnswer)}</h3>
    <div hidden={CheckQAnswer(f.QAnswer)}>
    <p>
      Question Grade: {f.Grade}  
    </p>
    <p>
    <TextField
            margin="normal"
            required
            fullWidth
            id="StudentAnswer"
            label="Mark"
            autoComplete="Mark"
            autoFocus
            type="number"
            onChange={(event)=>setMark(event.target.value,f.Grade,Answers.indexOf(f))}/>
    </p>
    </div>
    </p>
  </div>
</div>)}
    </div>
    </div>
    </div>

</>
    )
}
export default PastExams3;