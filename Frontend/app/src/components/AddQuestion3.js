import axios from 'axios';
import {useState,useEffect} from 'react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddQuestion3=()=>{
  const[Question,setQuestion]=useState("");
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
            sessionStorage.setItem("pressed",true)
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
    if(Question!="")
    {
      if(imgFile.files.length==0)
        sessionStorage.setItem("image",0)
      if(Level=="Easy")
      {
        const f = {
          ID: ID,
          CourseID: CourseID,
          EasyQuestions:{Question:Question,Type:Type,image:sessionStorage.getItem("image")}
          }
          axios.post('http://localhost:8000/questionBanks/updateEasy', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      else if(Level=="Medium")
      {
        const f = {
          ID: ID,
          CourseID: CourseID,
          MediumQuestions:{Question:Question,Type:Type,image:sessionStorage.getItem("image")}
          }
          axios.post('http://localhost:8000/questionBanks/updateMedium', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      else if(Level=="Hard")
      {
        const f = {
          ID: ID,
          CourseID: CourseID,
          HardQuestions:{Question:Question,Type:Type,image:sessionStorage.getItem("image")}
          }
          axios.post('http://localhost:8000/questionBanks/updateHard', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      sessionStorage.removeItem("image")
      sessionStorage.removeItem("pressed")
      toast("Question Added")
      history.push(`/ViewBanks`)
    }
    else{
      if(imgFile.files.length==0)
        toast("Fill in required data")
      else if(sessionStorage.getItem("pressed")!=undefined)
      {
        if(Level=="Easy")
      {
        const f = {
          ID: ID,
          CourseID: CourseID,
          EasyQuestions:{Question:Question,Type:Type,image:sessionStorage.getItem("image")}
          }
          axios.post('http://localhost:8000/questionBanks/updateEasy', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      else if(Level=="Medium")
      {
        const f = {
          ID: ID,
          CourseID: CourseID,
          MediumQuestions:{Question:Question,Type:Type,image:sessionStorage.getItem("image")}
          }
          axios.post('http://localhost:8000/questionBanks/updateMedium', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
      else if(Level=="Hard")
      {
        const f = {
          ID: ID,
          CourseID: CourseID,
          HardQuestions:{Question:Question,Type:Type,image:sessionStorage.getItem("image")}
          }
          axios.post('http://localhost:8000/questionBanks/updateHard', f )
          .then(res => res.data)
          .then(data => "Question Added")
          .catch(err => toast("Fill in all required data"))
      }
       sessionStorage.removeItem("image")
       sessionStorage.removeItem("pressed")
       toast("Question Added")
        history.push(`/ViewBanks`)
      }
      else{
        toast("Image not uploaded")
      }
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
                  multiline 
                  fullWidth
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
        <Button  color="success" variant="contained" style={{width:"100%"}}onClick={()=>{handleSubmit()}}>Add Question</Button>
      </p>
        </div>
        
  </div>
  
  
  </>
      )
  }
export default AddQuestion3;