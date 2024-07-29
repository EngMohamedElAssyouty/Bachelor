import axios from 'axios';
import {useState,useEffect} from 'react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem,FormControl,InputLabel,Select} from '@mui/material';

const EditQT=()=>{
  const[Question,setQuestion]=useState(null);
  const[Answer,setAnswer]=useState(null);
  const history=useHistory();

  var ID=sessionStorage.getItem("QID");
  var CourseID=sessionStorage.getItem("CID");
  var Level=sessionStorage.getItem("level");
  var Type=sessionStorage.getItem("type");
  var index=sessionStorage.getItem("index");
  var Q=sessionStorage.getItem("Question");
  var QA=sessionStorage.getItem("QAnswer");
  var Qimage=sessionStorage.getItem("Qimage");

  const CheckPreviewYes=(image)=>{
    var i=localStorage.getItem(image)
    if(i==undefined)
    {
      return true
    }
    else{
      return false
    }
  };

  const saveFile=()=>{
    var imgFile = document.getElementById('submitfile');
    if (imgFile.files && imgFile.files[0]) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var dataUri = event.target.result,
            img = document.createElement("img");
            img.src = dataUri;
            localStorage.setItem((img.src+"").substring(((img.src+"").length)-40),img.src)
            sessionStorage.setItem("image",(img.src+"").substring(((img.src+"").length)-40))
            toast("Uploaded File: "+(imgFile.value+"").substring(12)+" for the question")
       };
       reader.onerror = function(event) {
           console.error("File could not be read! Code " + event.target.error.code);
       };
       reader.readAsDataURL(imgFile.files[0]);
    }
}
  const handleSubmit=()=>{
    var imgFile = document.getElementById('submitfile');
    if(Level=="Easy")
    {
      const f = {
        ID: ID,
        CourseID: CourseID,
        index:index,
        EasyQuestions:{Question:Question, QAnswer:Answer,Type:Type,image:sessionStorage.getItem("image")}
        }
        axios.post('http://localhost:8000/questionBanks/editEasys1', f )
        .then(res => res.data)
        .then(data => "Question Added")
        .catch(err => toast("Fill in all required data"))
    }
    else if(Level=="Medium")
    {
      const f = {
        ID: ID,
        CourseID: CourseID,
        index:index,
        MediumQuestions:{Question:Question, QAnswer:Answer, Type:Type, image:sessionStorage.getItem("image")}
        }
        axios.post('http://localhost:8000/questionBanks/editMediums1', f )
        .then(res => res.data)
        .then(data => "Question Added")
        .catch(err => toast("Fill in all required data"))
    }
    else if(Level=="Hard")
    {
      const f = {
        ID: ID,
        CourseID: CourseID,
        index:index,
        HardQuestions:{Question:Question, QAnswer:Answer, Type:Type, image:sessionStorage.getItem("image")}
        }
        axios.post('http://localhost:8000/questionBanks/editHards1', f )
        .then(res => res.data)
        .then(data => "Question Added")
        .catch(err => toast("Fill in all required data"))
    }
    sessionStorage.removeItem("image")
      history.push(`/ViewBanks`)
};
        
        
    return(
<>
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
<div className="card mb-3"   style={{width:"100%"}}>
    <div className="card-body">
    <p className="card-text">
      <h3 style={{whiteSpace:"pre-wrap"}}>{Q}</h3>
      <img id="imgPreview1" src={localStorage.getItem(Qimage)} hidden={CheckPreviewYes(Qimage)} width="30%" height="100%"alt='Preview'/>
      <br/>
      <h4>Answer: {QA}</h4>
    </p>
    </div>
    </div>
    <h1>Edit</h1>
    <h2 style={{fontSize:"120%"}}>{Level} {Type} Question</h2>
    <div className="Card">
         <p>
          <TextField
                margin="normal"
                required
                fullWidth
                multiline 
                label="Question"
                autoComplete="creditHours"
                autoFocus
                value={Question}
                onChange={(event)=>setQuestion(event.target.value)}/>  
          </p> 
          <p>
            <input type="file" name="submitfile" id="submitfile" accept='image/png , image/jpg'/>
            <input type="button" value="Upload" onClick={()=>{saveFile()}} />
          </p>
    <p>
    <FormControl variant="outlined" fullWidth>
    <InputLabel id="demo-select-small">Change Correct Answer *</InputLabel>
    <Select
    labelId="demo-select-small"
    id="demo-select-small"

    value={Answer}
    onChange={(event)=>setAnswer(event.target.value)}
    >
    <MenuItem value="True">True</MenuItem>
    <MenuItem value="False">False</MenuItem>
    </Select>
    </FormControl>
    </p>      
    <p>
      <Button  color="success" variant="contained" style={{width:"100%"}}onClick={()=>{handleSubmit()}}>Update Question</Button>
    </p>
      </div>
      
</div>


</>
    )
}
export default EditQT;