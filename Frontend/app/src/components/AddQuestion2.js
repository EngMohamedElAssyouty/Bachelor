import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem,FormControl,InputLabel,Select} from '@mui/material';


const AddQuestion2=()=>{
  const[Question,setQuestion]=useState("");
  const[Answer,setAnswer]=useState("");
  const[CSolution,setCSolution]=useState("");
  const[WSolution1,setWSolution1]=useState("");
  const[WSolution2,setWSolution2]=useState("");
  const[WSolution3,setWSolution3]=useState("");
  const history=useHistory();

  var ID=sessionStorage.getItem("QID");
  var CourseID=sessionStorage.getItem("CID");
  var Level=sessionStorage.getItem("CLevel");
  var Type=sessionStorage.getItem("CType");

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
const saveFile1=()=>{
  var imgFile = document.getElementById('submitfile');
  if (imgFile.files && imgFile.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var dataUri = event.target.result,
          img = document.createElement("img");
          img.src = dataUri;
          localStorage.setItem((img.src+"").substring(((img.src+"").length)-40),img.src)
          sessionStorage.setItem("Fimage",(img.src+"").substring(((img.src+"").length)-40))
          toast("Uploaded File: "+(imgFile.value+"").substring(12) +" for first solution")
     };
     reader.onerror = function(event) {
         console.error("File could not be read! Code " + event.target.error.code);
     };
     reader.readAsDataURL(imgFile.files[0]);
  }
}
const saveFile2=()=>{
  var imgFile = document.getElementById('submitfile');
  if (imgFile.files && imgFile.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var dataUri = event.target.result,
          img = document.createElement("img");
          img.src = dataUri;
          localStorage.setItem((img.src+"").substring(((img.src+"").length)-40),img.src)
          sessionStorage.setItem("Simage",(img.src+"").substring(((img.src+"").length)-40))
          toast("Uploaded File: "+(imgFile.value+"").substring(12)+" for second solution")
     };
     reader.onerror = function(event) {
         console.error("File could not be read! Code " + event.target.error.code);
     };
     reader.readAsDataURL(imgFile.files[0]);
  }
}
const saveFile3=()=>{
  var imgFile = document.getElementById('submitfile');
  if (imgFile.files && imgFile.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var dataUri = event.target.result,
          img = document.createElement("img");
          img.src = dataUri;
          localStorage.setItem((img.src+"").substring(((img.src+"").length)-40),img.src)
          sessionStorage.setItem("Timage",(img.src+"").substring(((img.src+"").length)-40))
          toast("Uploaded File: "+(imgFile.value+"").substring(12)+" for third solution")
     };
     reader.onerror = function(event) {
         console.error("File could not be read! Code " + event.target.error.code);
     };
     reader.readAsDataURL(imgFile.files[0]);
  }
}
const saveFile4=()=>{
  var imgFile = document.getElementById('submitfile');
  if (imgFile.files && imgFile.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var dataUri = event.target.result,
          img = document.createElement("img");
          img.src = dataUri;
          localStorage.setItem((img.src+"").substring(((img.src+"").length)-40),img.src)
          sessionStorage.setItem("Foimage",(img.src+"").substring(((img.src+"").length)-40))
          toast("Uploaded File: "+(imgFile.value+"").substring(12)+" for fourth solution")
     };
     reader.onerror = function(event) {
         console.error("File could not be read! Code " + event.target.error.code);
     };
     reader.readAsDataURL(imgFile.files[0]);
  }
}

  const handleSubmit=()=>{
    var imgFile = document.getElementById('submitfile');

    if((Question==""&& sessionStorage.getItem("image")=="0")||(CSolution==""&&sessionStorage.getItem("Fimage")=="0")||
    (WSolution1==""&&sessionStorage.getItem("Simage")=="0")||(WSolution2==""&&sessionStorage.getItem("Timage")=="0")||
    (WSolution3==""&&sessionStorage.getItem("Foimage")=="0"))
    {
      toast("Fill in required data")
    }
    else if(Answer=="")
    {
      toast("Confirm an answer by choosing a solution")
    }
    else
    {
      if(Level=="Easy")
      {
        if(Answer=="1"){
          if(CSolution!="")
            var KAnswer=CSolution;
          else
            var KAnswer=sessionStorage.getItem("Fimage");
        }
        else if(Answer=="2"){
          if(WSolution1!="")
            var KAnswer=WSolution1;
          else
            var KAnswer=sessionStorage.getItem("Simage");
        }
        else if(Answer=="3"){
          if(WSolution2!="")
            var KAnswer=WSolution2;
          else
            var KAnswer=sessionStorage.getItem("Timage");
        }
        else{
          if(WSolution3!="")
            var KAnswer=WSolution3;
          else
            var KAnswer=sessionStorage.getItem("Foimage");
        }
        const f = {
          ID: ID,
          CourseID: CourseID,
          EasyQuestions:{Question:Question,QAnswer:KAnswer,CSolution:CSolution,WSolution1:WSolution1,WSolution2:WSolution2,WSolution3:WSolution3,Type:Type,image:sessionStorage.getItem("image"),fimage:sessionStorage.getItem("Fimage"),simage:sessionStorage.getItem("Simage"),timage:sessionStorage.getItem("Timage"),foimage:sessionStorage.getItem("Foimage")}
          }
          axios.post('http://localhost:8000/questionBanks/updateEasy', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      else if(Level=="Medium")
      {
        if(Answer=="1"){
          if(CSolution!="")
            var KAnswer=CSolution;
          else
            var KAnswer=sessionStorage.getItem("Fimage");
        }
        else if(Answer=="2"){
          if(WSolution1!="")
            var KAnswer=WSolution1;
          else
            var KAnswer=sessionStorage.getItem("Simage");
        }
        else if(Answer=="3"){
          if(WSolution2!="")
            var KAnswer=WSolution2;
          else
            var KAnswer=sessionStorage.getItem("Timage");
        }
        else{
          if(WSolution3!="")
            var KAnswer=WSolution3;
          else
            var KAnswer=sessionStorage.getItem("Foimage");
        }
        const f = {
          ID: ID,
          CourseID: CourseID,
          MediumQuestions:{Question:Question,QAnswer:KAnswer,CSolution:CSolution,WSolution1:WSolution1,WSolution2:WSolution2,WSolution3:WSolution3,Type:Type,image:sessionStorage.getItem("image"),fimage:sessionStorage.getItem("Fimage"),simage:sessionStorage.getItem("Simage"),timage:sessionStorage.getItem("Timage"),foimage:sessionStorage.getItem("Foimage")}
          }
          axios.post('http://localhost:8000/questionBanks/updateMedium', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      else if(Level=="Hard")
      {
        if(Answer=="1"){
          if(CSolution!="")
            var KAnswer=CSolution;
          else
            var KAnswer=sessionStorage.getItem("Fimage");
        }
        else if(Answer=="2"){
          if(WSolution1!="")
            var KAnswer=WSolution1;
          else
            var KAnswer=sessionStorage.getItem("Simage");
        }
        else if(Answer=="3"){
          if(WSolution2!="")
            var KAnswer=WSolution2;
          else
            var KAnswer=sessionStorage.getItem("Timage");
        }
        else{
          if(WSolution3!="")
            var KAnswer=WSolution3;
          else
            var KAnswer=sessionStorage.getItem("Foimage");
        }
        const f = {
          ID: ID,
          CourseID: CourseID,
          HardQuestions:{Question:Question,QAnswer:KAnswer,CSolution:CSolution,WSolution1:WSolution1,WSolution2:WSolution2,WSolution3:WSolution3,Type:Type,image:sessionStorage.getItem("image"),fimage:sessionStorage.getItem("Fimage"),simage:sessionStorage.getItem("Simage"),timage:sessionStorage.getItem("Timage"),foimage:sessionStorage.getItem("Foimage")}
          }
          axios.post('http://localhost:8000/questionBanks/updateHard', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      sessionStorage.removeItem("image")
      sessionStorage.removeItem("Fimage")
      sessionStorage.removeItem("Simage")
      sessionStorage.removeItem("Timage")
      sessionStorage.removeItem("Foimage")
        toast("Question Added")
        history.push(`/ViewBanks`)
    }
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
    <h1>Step 2</h1>
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
            <input type="button" value="Upload Question" onClick={()=>{saveFile()}} style={{marginLeft:1075}}/>
          </p> 
          <p>
          <TextField
                margin="normal"
                required
                fullWidth
                multiline 
                label="First Solution"
                autoComplete="creditHours"
                autoFocus
                value={CSolution}
                onChange={(event)=>setCSolution(event.target.value)}/>  
            <input type="button" value="Upload First Solution" onClick={()=>{saveFile1()}} style={{marginLeft:1045}}/>
          </p> 
          <p>
          <TextField
                margin="normal"
                required
                fullWidth
                multiline 
                label="Second Solution"
                autoComplete="creditHours"
                autoFocus
                value={WSolution1}
                onChange={(event)=>setWSolution1(event.target.value)}/>  
            <input type="button" value="Upload Second Solution" onClick={()=>{saveFile2()}} style={{marginLeft:1025}}/>
          </p> 
          <p>
          <TextField
                margin="normal"
                required
                multiline 
                fullWidth
                label="Third Solution"
                autoComplete="creditHours"
                autoFocus
                value={WSolution2}
                onChange={(event)=>setWSolution2(event.target.value)}/>  
            <input type="button" value="Upload Third Solution" onClick={()=>{saveFile3()}} style={{marginLeft:1040}}/>
          </p> 
          <p>
          <TextField
                margin="normal"
                required
                fullWidth
                multiline 
                label="Fourth Solution"
                autoComplete="creditHours"
                autoFocus
                value={WSolution3}
                onChange={(event)=>setWSolution3(event.target.value)}/>  
            <input type="button" value="Upload Fourth Solution" onClick={()=>{saveFile4()}} style={{marginLeft:1030}} />
          </p> 
          <p>
            <input type="file" name="submitfile" id="submitfile" accept='image/png , image/jpg' style={{marginRight:1000}}/>
          </p>
  <br/>
  <p>
    <FormControl sx={{ minWidth:"100%" }}>
    <InputLabel id="demo-select-small">Confirm Answer</InputLabel>
    <Select
    labelId="demo-select-small"
    id="demo-select-small"
    value={Answer}
    onChange={(event)=>setAnswer(event.target.value)}
    >
    <MenuItem value="1">First solution</MenuItem>
    <MenuItem value="2">Second Solution</MenuItem>
    <MenuItem value="3">Third Solution</MenuItem>
    <MenuItem value="4">Fourth Solution</MenuItem>
    </Select>
    </FormControl>
    </p>
    <p>
      <Button  color="success" variant="contained" style={{width:"100%"}}onClick={()=>{handleSubmit()}}>Add Question</Button>
    </p>
      </div>
      
</div>


</>
    )
}
export default AddQuestion2;