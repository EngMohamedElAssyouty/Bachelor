import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateExam2=()=>{
  const[QuestionBanks,setQuestionBanks]=useState([]);
  const List2=JSON.parse(sessionStorage.getItem("ListOfQuestions"));
  const sumGrade=JSON.parse(sessionStorage.getItem("GradeSum"));
  const history=useHistory();
  useEffect(()=>{
    const {ID,CourseID, Title,EasyQuestions,MediumQuestions,HardQuestions}=queryString.parse(window.location.search);
        AllQuestionBanks({ID,CourseID, Title,EasyQuestions,MediumQuestions,HardQuestions})
        .then(res=>{
            setQuestionBanks(res.data);
            })
            
    },[window.location.search]);
    const f = {CourseID: sessionStorage.getItem("CID")}
    const AllQuestionBanks = async (query)=> await axios.post("http://localhost:8000/questionBanks/SearchResult",f);
    
    const AddBank=(ID,Title,Enum,Mnum,Hnum)=>{
        sessionStorage.setItem("QID",ID)
        sessionStorage.setItem("Title",Title)
        sessionStorage.setItem("ELength",Enum)
        sessionStorage.setItem("MLength",Mnum)
        sessionStorage.setItem("HLength",Hnum)
        if(sessionStorage.getItem("Enum"+ID)==undefined)
            sessionStorage.setItem("Enum"+ID,Enum)
        if(sessionStorage.getItem("Mnum"+ID)==undefined)
            sessionStorage.setItem("Mnum"+ID,Mnum)
        if(sessionStorage.getItem("Hnum"+ID)==undefined)
            sessionStorage.setItem("Hnum"+ID,Hnum)
        history.push("/createExam3")
    };
    const Delete=(element)=>{
        var List=[]
        for(var i=0;i<List2.length;i++)
        {
            if(List2[i]!=element)
                List.push(List2[i])
        }
        console.log(List)
        if(element.Level=="Easy")
        {
          sessionStorage.setItem("Enum"+element.QuestionBank,parseInt(sessionStorage.getItem("Enum"+element.QuestionBank))+parseInt(element.Number))
        }
        else if(element.Level=="Medium")
        {
          sessionStorage.setItem("Mnum"+element.QuestionBank,parseInt(sessionStorage.getItem("Mnum"+element.QuestionBank))+parseInt(element.Number))
        }
        else
        {
          sessionStorage.setItem("Hnum"+element.QuestionBank,parseInt(sessionStorage.getItem("Hnum"+element.QuestionBank))+parseInt(element.Number))
        }
        sessionStorage.setItem("GradeSum",JSON.stringify(JSON.parse(sessionStorage.getItem("GradeSum"))-element.Grade))
        sessionStorage.setItem("ListOfQuestions",JSON.stringify(List))
        window.location.reload()
    };
    const NumQuestion=()=>{
        var sum=0
        for(var i=0;i<List2.length;i++)
        {
            sum+=parseInt(List2[i].Number)
        }
        return sum;
    };
    const Finish=()=>{
      var AllQuestions=[]
      for(var i=0;i<QuestionBanks.length;i++)
      {
        AllQuestions.push(QuestionBanks[i].EasyQuestions)
        AllQuestions.push(QuestionBanks[i].MediumQuestions)
        AllQuestions.push(QuestionBanks[i].HardQuestions)
      }

        if(parseInt(sessionStorage.getItem("Grade"))-parseInt(sumGrade)==0 && List2!=[])
        {
            const f = {
                CourseID: sessionStorage.getItem("CID"),
                ExamName:sessionStorage.getItem("ExamName"),
                Type: sessionStorage.getItem("ExamType"),
                Grade: parseInt(sessionStorage.getItem("Grade")),
                StartTime: sessionStorage.getItem("StartTime"),
                EndTime: sessionStorage.getItem("EndTime"),
                Duration: sessionStorage.getItem("Duration"),
                listofQuestions:List2,
                AllQuestions:AllQuestions
                }
                axios.post('http://localhost:8000/exams/create', f )
                .then(res => res.data)
                .then(data => toast("SUCCESSFULLY Created"))
                .catch(err => toast("ERROR PLEASE TRY AGAIN"))
                
                const f1 = {
                  Email:sessionStorage.getItem("InstructorEmail"),
                  Type:sessionStorage.getItem("ExamType"),
                  Grade:parseInt(sessionStorage.getItem("Grade")),
                  CourseID:sessionStorage.getItem("CID"),
                  StartTime:sessionStorage.getItem("StartTime"),
                  Duration:sessionStorage.getItem("Duration")
                  }
                axios.post('http://localhost:8000/exams/email', f1 )
                .then(res => res.data)
                .then(data => toast("SUCCESSFULLY Created"))
                .catch(err => toast("ERROR PLEASE TRY AGAIN"))
                history.push(`/HomePage`);
        }
        else{
            var y=parseInt(sessionStorage.getItem("Grade"))-parseInt(sumGrade);
            toast("Fill in Questions worth of "+y+ " marks.")
        }
    };

    return(
<>
<Menu/>
<ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center"  style={{fontSize:"120%"}}> 
    <h1 style={{fontSize:"330%",marginBottom:20}}> Step 2 </h1>
    <div className="row" style={{marginBottom:20}}>
    <div className="card text-center" style={{backgroundColor:'blue', color:"white", width:"18%",marginRight:23}}>
      <h3>{sessionStorage.getItem("CID")}</h3>
    </div>
    <div className="card text-center" style={{backgroundColor:'orange', color:"white", width:"18%",marginRight:23}}>
      <h3>{sessionStorage.getItem("ExamName")}</h3>
    </div>
    <div className="card text-center" style={{backgroundColor:'purple', color:"white", width:"18%",marginRight:23}}>
      <h3 >{sessionStorage.getItem("Grade")} Marks</h3>
    </div>
    <div className="card text-center" style={{backgroundColor:'green', color:"white", width:"18%",marginRight:25}}>
      <h3 >{sessionStorage.getItem("Duration")} minutes</h3>
    </div>
    <div className="card text-center" style={{backgroundColor:'red', color:"white", width:"20%"}}>
      <h4 >{NumQuestion()} Questions Added</h4>
    </div>
    </div>

    <div className="card text-center" style={{backgroundColor:'black', color:"white", width:"50%",marginLeft:300}}>
      <h4 >{parseInt(sessionStorage.getItem("Grade"))-parseInt(sumGrade)} Marks left to add</h4>
    </div>
    <div className="card mb-3" style={{width:"100%"}} hidden={List2.length==0}>
    <div className="card-body">
    <p> 
      {List2.map((f1)=><div className="card border border-dark mb-3"   style={{width:"100%"}} key={f1.id} f1={f1}>
        <div className="card-body">
        <p className="card-text">
          <h3>
            {f1.Number} {f1.Level} Question(s) from {f1.QuestionBankTitle} with grade {f1.Grade} is added.
         </h3>
        <p>
          <Button style={{width:"20%"}} color="error" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{Delete(f1)}}>Remove</Button>
        </p>
    </p>
    </div>
    </div>)}
  </p>
  </div>
  </div>
  </div>

    <div className="container-fluid p-5" style={{fontSize:"120%"}}>

   
    <div className="row" >
      {QuestionBanks.map((f)=><div className="card border border-dark mb-3"   style={{width:"48.36%",marginRight:20}} key={f.id} f={f}>

      <div className="card text-center" style={{width:"25%",fontSize:16,color:'white',backgroundColor:"black"}}>
{f.EasyQuestions.length+f.MediumQuestions.length+f.HardQuestions.length} Question(s)
  </div>
  <div className="card-body">
    <h5 className="card-title text-center" style={{fontSize:37}}>{f.Title}</h5>
    <p className="card-text">
    <p>
    <Button fullWidth color="primary" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{AddBank(f.ID,f.Title,f.EasyQuestions.length,f.MediumQuestions.length,f.HardQuestions.length)}}>Add Questions from this Question Bank</Button>
    </p>
    </p>
  </div>
</div>)}
    <p>
    <Button fullWidth color="success" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{Finish()}}>Finish</Button>
    </p>
    </div>
    </div>
</>
    )
}
export default CreateExam2;