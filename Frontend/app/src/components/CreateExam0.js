import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem,FormControl,InputLabel,Select} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const CreateExam0=()=>{
    const[ExamName,setExamName]=useState("");
    const[Grade,setGrade]=useState("");
    const[ExamType,setExamType]=useState("");
    const[StartTime,setStartTime]=useState(new Date());
    const[EndTime,setEndTime]=useState(new Date());
    const history=useHistory();

const handleSubmit=(CourseID)=>{
  if(ExamName!="" &&Grade!=="" &&ExamType!="" &&StartTime.getDate()==EndTime.getDate() && StartTime.getFullYear()==EndTime.getFullYear() && StartTime.getMonth()==EndTime.getMonth())  
  {
    //////////////////////////////////////////////////////////////////////////////////////////////////

    var x=parseInt(StartTime.toLocaleTimeString().split(":")[0]);
    var y=parseInt(EndTime.toLocaleTimeString().split(":")[0]);
    
    var x1=parseInt(StartTime.toLocaleTimeString().split(":")[1]);
    var y1=parseInt(EndTime.toLocaleTimeString().split(":")[1]);
    
    var temp=StartTime.toLocaleTimeString().split(":")[2].split(" ")[1];
    var temp1=EndTime.toLocaleTimeString().split(":")[2].split(" ")[1];
    
    if(temp!=temp1 && x>=y)
      y=y+12;
    if(temp==temp1 && x>y)
      y=y+12;
    var z=(y-x)*60 + (y1-x1);

    sessionStorage.setItem("CID", CourseID)
    sessionStorage.setItem("ExamName", ExamName)
    sessionStorage.setItem("Grade", Grade)
    sessionStorage.setItem("ExamType", ExamType)
    sessionStorage.setItem("StartTime", StartTime)
    sessionStorage.setItem("EndTime", EndTime)
    sessionStorage.setItem("Duration", z)
    sessionStorage.setItem("ListOfQuestions", JSON.stringify([]))
    sessionStorage.setItem("GradeSum", JSON.stringify(0))

    toast("The duration of the "+ExamType+" is "+z+" minutes")
    history.push(`/createExam2`);
  }
  else{
      toast("Fill in all reuired data")
  }
};
return(
    <>
    <div>
    <Menu/>
    <ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center">
          <h2>Step 1</h2>
          <form>
          <p>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Exam Name"
            autoComplete="ExamName"
            autoFocus
            value={ExamName}
            onChange={(event)=>setExamName(event.target.value)}/>
            </p>
          <p>
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Exam Grade"
            autoComplete="Grade"
            autoFocus
            value={Grade}
            onChange={(event)=>setGrade(event.target.value)}/>
            </p>
            <p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
            renderInput={(props) => <TextField fullWidth {...props} />}
            label="Start Time"
            value={StartTime}
            onChange={(StartTime) => setStartTime(StartTime)}/>
            </LocalizationProvider>
            </p>
            <p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
            renderInput={(props) => <TextField fullWidth {...props} />}
            label="End Time"
            value={EndTime}
            onChange={(EndTime) => setEndTime(EndTime)}/>
            </LocalizationProvider>
            </p>

    <p>
    <FormControl sx={{ minWidth:"100%" }}>
    <InputLabel id="demo-select-small">Choose Assessement Type</InputLabel>
    <Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={ExamType}
    onChange={(event)=>setExamType(event.target.value)}
    >
    <MenuItem value="Quiz">Quiz</MenuItem>
    <MenuItem value="Midterm">Midterm</MenuItem>
    <MenuItem value="Final">Final</MenuItem>
    </Select>
    </FormControl>
    </p>
    <p>
        <Button style={{wGradeth:"100%"}} variant="contained"  onClick={()=>{handleSubmit(sessionStorage.getItem("CID"))}}>Next step</Button>
    </p>
          </form>
        </div>
        </div>
    
    </>
        )
    }
    export default CreateExam0;