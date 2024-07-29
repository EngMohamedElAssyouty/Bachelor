import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddBank=()=>{
  const[Title,setTitle]=useState("");
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
    const handleSubmit=()=>{
    if(Title!="")
    {
        const f = {
            ID: QuestionBanks.length+1,
            CourseID: sessionStorage.getItem("CID"),
            Title:Title,
            EasyQuestions:[],
            MediumQuestions:[],
            HardQuestions:[]
        }
          axios.post('http://localhost:8000/questionBanks/create', f )
          .then(res => res.data)
          .then(data => toast("Successfully created"))
          .catch(err => toast("ERROR"))
        
          const f1 = {CourseID: sessionStorage.getItem("CID")};
          axios.post('http://localhost:8000/courses/update', f1 )
          .then(res => res.data)
          .then(data => "Done")
          .catch(err => "Error")
          history.push("/ViewBanks0")
    }
    else{
      toast("No Title Added")
    }
  };        
    return(
<>
<div>
  <Menu/>
  <ToastContainer position="top-center" />
      <h2>Question Bank</h2>
      <form>
      <TextField
            margin="normal"
            required
            fullWidth
            label="Add a Title"
            autoComplete="id"
            autoFocus
            value={Title}
            onChange={(event)=>setTitle(event.target.value)}/>
      </form>
      <p>
        <Button fullWidth color="success" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{handleSubmit()}}>Create Question Bank</Button>
      </p>
    </div>


</>
    )
}
export default AddBank;