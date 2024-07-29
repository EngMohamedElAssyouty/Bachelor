import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FormLabel from '@mui/material/FormLabel';

const ViewBanks0=()=>{
  const[QuestionBanks,setQuestionBanks]=useState([]);
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

    const AddBank=()=>{
      history.push("/AddBank")
    };

    const Check=(QuestionBanks)=>{
      if(QuestionBanks.length==0)
          return false;
      else
          return true;    
  };
    const EditBank=(ID,CourseID)=>{
        sessionStorage.setItem("QID",ID)
        sessionStorage.setItem("CID",CourseID)
        history.push(`/ViewBanks`)
    };

    return(
<>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" >
<div className="card text-center" style={{backgroundColor:'blue', color:"white", width:"20%",marginRight:20}}>
  <h3>{sessionStorage.getItem("CID")}</h3>
</div>
<div className="card text-center" style={{backgroundColor:'orange', color:"white", width:"20%"}}>
  <h3>Question Banks</h3>
</div>
</div>
    <div className="container-fluid p-5 text-center"> 
    <div className="row" >
    <Button style={{width:"16%"}} color="success" variant="contained" sx={{ml:6}}onClick={()=>{history.push("/createExam0")}}>Create Assessment</Button>
    <Button style={{width:"16%"}} color="success" variant="contained"sx={{ml:89}}onClick={()=>{AddBank()}}>Add Question Bank</Button>
    </div>
    <div className="container-fluid p-5">
    <div>
        <FormLabel style={{fontSize:25}} hidden={Check(QuestionBanks)}>No Question Banks Created</FormLabel>
    </div>
    <div className="row" >
      {QuestionBanks.map((f)=><div className="card border border-dark mb-3"   style={{width:"48%",marginRight:20}} key={f.id} f={f}>

<div className="card" style={{width:"25%",fontSize:16,color:'white',backgroundColor:"black"}}>
{f.EasyQuestions.length+f.MediumQuestions.length+f.HardQuestions.length} Question(s)
  </div>
  <div className="card-body">
    <h5 className="card-title">{f.Title}</h5>
    <p className="card-text">
    <p>
    </p>
    <p>
    <Button fullWidth color="primary" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{EditBank(f.ID,f.CourseID)}}>Select</Button>
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
export default ViewBanks0;