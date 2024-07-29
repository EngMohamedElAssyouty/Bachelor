import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem,FormControl,InputLabel,Select} from '@mui/material';

const AddQuestions=()=>{
  const[QuestionsLevel,setQuestionsLevel]=useState("");
  const[QuestionsType,setQuestionsType]=useState("");
  const history=useHistory();
  const handleSubmit=()=>{
    if(QuestionsLevel!="" && QuestionsType!="")
    {
        sessionStorage.setItem("CLevel",QuestionsLevel)
        sessionStorage.setItem("CType",QuestionsType)
        if(QuestionsType=="Multiple")
        {
          sessionStorage.setItem("image",0)
          sessionStorage.setItem("Fimage",0)
          sessionStorage.setItem("Simage",0)
          sessionStorage.setItem("Timage",0)
          sessionStorage.setItem("Foimage",0)
          history.push("/AddQuestion2");
        }
        else if(QuestionsType=="T/F")
        {
          history.push("/AddQuestion4");
        }
        else
        {
          history.push("/AddQuestion3");
        }
    }
    else
    {
        toast("Fill in all required data")
    }
  };        
    return(
<>
<div>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" >
<Button className="card text-center" style={{backgroundColor:'blue', color:"white", width:"20%",marginRight:20,textTransform:'none'}} onClick={()=>{history.push("/ViewBanks0")}}>
  <h3>{sessionStorage.getItem("CID")}</h3>
</Button>
<Button className="card text-center" style={{backgroundColor:'orange', color:"white", width:"20%",marginRight:20,textTransform:'none'}} onClick={()=>{history.push("/ViewBanks")}}>
  <h3>{sessionStorage.getItem("Title")}</h3>
</Button>
</div>
<div className="container-fluid p-5 text-center"> 
    <h1>Step 1</h1>
    </div>
    <div className="container-fluid p-5 text-center"> 
    <form>
    <p>
    <FormControl sx={{ minWidth:"25%" }}>
    <InputLabel id="demo-select-small">Choose Question Level</InputLabel>
    <Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={QuestionsLevel}
    onChange={(event)=>setQuestionsLevel(event.target.value)}
    >
    <MenuItem value="Easy">Easy</MenuItem>
    <MenuItem value="Medium">Medium</MenuItem>
    <MenuItem value="Hard">Hard</MenuItem>
    </Select>
    </FormControl>
    </p>
    <p>
    <FormControl sx={{ minWidth:"25%" }}>
    <InputLabel id="demo-select-small">Choose Question Type</InputLabel>
    <Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={QuestionsType}
    onChange={(event)=>setQuestionsType(event.target.value)}
    >
    <MenuItem value="Multiple">Multiple Choice</MenuItem>
    <MenuItem value="Text">Text Area</MenuItem>
    <MenuItem value="Drawing">Drawing</MenuItem>
    <MenuItem value="T/F">True/Flase</MenuItem>
    </Select>
    </FormControl>
    </p>
      </form>
      <p>
    <Button  color="success" variant="contained" style={{width:"20%"}}onClick={()=>{handleSubmit()}}>Next Step</Button>
    </p>
    </div>

    </div>

</>
    )
}
export default AddQuestions;