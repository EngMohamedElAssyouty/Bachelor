import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem,FormControl,InputLabel,Select} from '@mui/material';

var List=JSON.parse(sessionStorage.getItem("ListOfQuestions"));
if(List==undefined)
List=[]
var sumGrade=0;

const CreateExam3=()=>{
    const[NumberOfQuestions,setNumberOfQuestions]=useState("");
    const[QuestionLevel,setQuestionLevel]=useState("");
    const[QGrade,setQGrade]=useState("");

    const history=useHistory();
    var Grade=sessionStorage.getItem("Grade");
const handleSubmit=()=>{
  if(NumberOfQuestions!="" &&QuestionLevel!=="" &&QGrade!="")  
  {
    if(sessionStorage.getItem("GradeSum")!=undefined)
    {
        sumGrade=JSON.parse(sessionStorage.getItem("GradeSum"))
    }
    if((sumGrade+parseInt(QGrade))<=Grade)
    {
        var QID=sessionStorage.getItem("QID")
        var Title=sessionStorage.getItem("Title")
        if(QuestionLevel=="Easy")
        {
            if(NumberOfQuestions<=sessionStorage.getItem("Enum"+QID))
            {
                List.push({Number:NumberOfQuestions,Level:QuestionLevel,QuestionBank:QID,Grade:QGrade,QuestionBankTitle:Title})
                sumGrade=sumGrade+parseInt(QGrade);
                toast(NumberOfQuestions+" "+QuestionLevel+" questions with grade "+QGrade+" are added.");
                var x=sessionStorage.getItem("Enum"+QID)
                var y=parseInt(x.substring((x.length)-(QID.length)))
                var z=y-parseInt(NumberOfQuestions)
                sessionStorage.setItem("Enum"+QID,z)
                history.push("/createExam2")
            }
            else{
                toast("Not enough Easy Questions in Question Bank "+QID);
            }

        }
        else if(QuestionLevel== "Medium")
        {
            if(NumberOfQuestions<=sessionStorage.getItem("Mnum"+QID))
            {
                List.push({Number:NumberOfQuestions,Level:QuestionLevel,QuestionBank:QID,Grade:QGrade,QuestionBankTitle:Title})
                sumGrade=sumGrade+parseInt(QGrade);
                toast(NumberOfQuestions+" "+QuestionLevel+" questions with grade "+QGrade+" are added.");
                var x=sessionStorage.getItem("Mnum"+QID)
                var y=parseInt(x.substring((x.length)-(QID.length)))
                var z=y-parseInt(NumberOfQuestions)
                sessionStorage.setItem("Mnum"+QID,z)
                history.push("/createExam2")
            }
            else{
                toast("Not enough Medium Questions in Question Bank "+QID);
            }

        }
        else
        {
            if(NumberOfQuestions<=sessionStorage.getItem("Hnum"+QID))
            {
                List.push({Number:NumberOfQuestions,Level:QuestionLevel,QuestionBank:QID,Grade:QGrade,QuestionBankTitle:Title})
                sumGrade=sumGrade+parseInt(QGrade);
                toast(NumberOfQuestions+" "+QuestionLevel+" questions with grade "+QGrade+" are added.");
                var x=sessionStorage.getItem("Hnum"+QID)
                var y=parseInt(x.substring((x.length)-(QID.length)))
                var z=y-parseInt(NumberOfQuestions)
                sessionStorage.setItem("Hnum"+QID,z)
                history.push("/createExam2")
            }
            else{
                toast("Not enough Hard Questions in Question Bank "+QID);
            }

        }
        sessionStorage.setItem("GradeSum",JSON.stringify(sumGrade))
        sessionStorage.setItem("ListOfQuestions",JSON.stringify(List))

    }
    else{
        toast("The Maximum Grade is "+Grade+" you have Exceeded it you have "+(Grade-sumGrade) +" marks left worth of Questions.");
    }

  }
  else{
      toast("Fill in all reuired data")
  }
};
const handleSubmit1=()=>{
    sessionStorage.setItem("GradeSum",JSON.stringify(sumGrade))
    sessionStorage.setItem("ListOfQuestions",JSON.stringify(List))
    history.push("/createExam2")
  };
return(
    <>
    <div>
    <Menu/>
    <ToastContainer position="top-center" />
    <div className="card text-center" style={{backgroundColor:'black', color:"white", width:"100%",marginLeft:-13}}>
      <h3>{sessionStorage.getItem("Title")}</h3>
    </div>
    <br/>
    <div className="row" style={{marginBottom:20}}>
    <div className="card text-center" style={{backgroundColor:'blue', color:"white", width:"31.6%",marginRight:23}}>
      <h3>{sessionStorage.getItem("Enum"+sessionStorage.getItem("QID"))} Easy Question(s) left</h3>
    </div>
    <div className="card text-center" style={{backgroundColor:'orange', color:"white", width:"31.6%",marginRight:23}}>
      <h3>{sessionStorage.getItem("Mnum"+sessionStorage.getItem("QID"))} Medium Question(s) left</h3>
    </div>
    <div className="card text-center" style={{backgroundColor:'purple', color:"white", width:"31.5%",marginRight:23}}>
      <h3 >{sessionStorage.getItem("Hnum"+sessionStorage.getItem("QID"))} Hard Question(s) left</h3>
    </div>
    </div>
    <div className="container-fluid p-5 text-center">
          <h2>Step 3</h2>
          <form>
          <p>
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Number Of Questions"
            autoComplete="NumberOfQuestions"
            autoFocus
            value={NumberOfQuestions}
            onChange={(event)=>setNumberOfQuestions(event.target.value)}/>
            </p>
    <p>
    <FormControl sx={{ minWidth:"100%" }}>
    <InputLabel id="demo-select-small">Questions Level</InputLabel>
    <Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={QuestionLevel}
    onChange={(event)=>setQuestionLevel(event.target.value)}
    >
    <MenuItem value="Easy">Easy</MenuItem>
    <MenuItem value="Medium">Medium</MenuItem>
    <MenuItem value="Hard">Hard</MenuItem>
    </Select>
    </FormControl>
    </p>
    <p>
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Questions Grade"
            autoComplete="QGrade"
            autoFocus
            value={QGrade}
            onChange={(event)=>setQGrade(event.target.value)}/>
            </p>
    <p>
    <Button fullWidth color="success" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{handleSubmit()}}>Add Questions</Button>
    </p>
          </form>
        </div>
        <div className="container-fluid p-5 ">
        <p>
        <Button  color="warning" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{handleSubmit1()}}>Back</Button>
        </p>
        </div>
        </div>
    
    </>
        )
    }
    export default CreateExam3;