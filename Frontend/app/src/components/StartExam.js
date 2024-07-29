import React from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Button,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@mui/material';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ExamBar from './ExamBar';


const StartExam=()=>{
    var CourseID= sessionStorage.getItem("CourseID")
    var ExamName= sessionStorage.getItem("ExamName")
    var Type= sessionStorage.getItem("Type")
    var Grade= sessionStorage.getItem("Grade")
    var StudentEmail=sessionStorage.getItem("StudentEmail")
    var FinalList= JSON.parse(sessionStorage.getItem("FinalList"))
    var AnsList= JSON.parse(localStorage.getItem("AnsList"))
    var UnAnsList= JSON.parse(localStorage.getItem("AnsList"))

    const helper=(sol,i)=>{ 
      if(sol=="")
      {
        return i
      }
      else
      {
        return sol;
      }
    };
    const checkStart=(start)=>{ 
      if(start=="Yes")
      {
        return true
      }
      else
      {
        return false;
      }
    };
    const checkCam=()=>{
      let video = document.querySelector("#video");  
      if(video!=undefined)
      {
        if(video.srcObject.active)
        {
          sessionStorage.setItem("start","Yes")
          return false
        }
        else
        {
          return true;
        }

      }
      else
      {
        return true;
      }
    };

    const start=()=>{
      let camera_button = document.querySelector("#start-camera");
      let video = document.querySelector("#video");
      
      camera_button.addEventListener('click', async function() {
        let stream=null;
        try{
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        sessionStorage.setItem("start","Yes")
        document.getElementById("form").hidden=false
        document.getElementById("start-camera").hidden=true;
        sessionStorage.setItem("imageTime",1)
        }
        catch(err)
        {
        }
      });
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
    const setAnswer=(Ans,index)=>{
      console.log(Ans)
        UnAnsList[index].Answer=Ans
      };
    const CheckTextArea=(QType)=>{
      if(QType=="Text")
      {
        return false;
      }
      else
      {
        return true;
      }
    };
    const CheckMultiple=(QType)=>{
        if(QType=="Multiple")
        {
          return false;
        }
        else
        {
          return true;
        }
      };
      const CheckDraw=(QType)=>{
        if(QType=="Drawing")
        {
          return false;
        }
        else
        {
          return true;
        }
      };
      const CheckTF=(QType)=>{
        if(QType=="T/F")
        {
          return false;
        }
        else
        {
          return true;
        }
      };
    const history=useHistory();
    const handleSubmit=(index,Type)=>{
      AnsList= JSON.parse(localStorage.getItem("AnsList"))
      if(UnAnsList[index].Answer!="")
      {
        AnsList[index].Answer=UnAnsList[index].Answer
        const f = {
          CourseID:sessionStorage.getItem("CourseID"),
          ExamName:sessionStorage.getItem("ExamName"),
          StudentEmail:sessionStorage.getItem("StudentEmail"),
          AnsList:AnsList
          }
          axios.post('http://localhost:8000/pastExams/updateAnswer', f )
          .then(res => res.data)
          .then(data => "SUCCESSFULLY Created")
          .catch(err => "ERROR PLEASE TRY AGAIN")
        localStorage.setItem("AnsList",JSON.stringify(AnsList))
        toast("Successfully submitted question")
      }
      else
      {
        toast("Cannot submit unanswered question")
      }
    };
    const handleSubmit1=()=>{
        var flag=true;
        AnsList= JSON.parse(localStorage.getItem("AnsList"))
        for(var i=0;i<AnsList.length;i++)
        {
            if(AnsList[i].Answer=="")
            {
                flag=false;
                toast("Question number "+(i+1)+" Is not submitted yet")
            }
        }
        if(flag)
        {
            toast("Successfully Submitted")
            var ExamID=sessionStorage.getItem("ExamID")
            localStorage.setItem("Finished "+ExamID+sessionStorage.getItem("StudentEmail"),true)
              var video=document.querySelector("#video")
              video.pause()
              video.currentTime = 0;
            history.push("/ThankYou")
        }
    };
    return(
<>
<div>
<ExamBar/>
<ToastContainer position="top-center" />
    <div className="container-fluid p-5 text-center"  style={{fontSize:"120%"}}> 
      <h2>Start Exam</h2>
      </div>
      <form id="form" hidden={checkCam()}>
      <div className="column" >
      {FinalList.map((f)=><div    style={{width:"100%"}} key={f.id} f={f}>
    
    <div>
    <h2>Question: {FinalList.indexOf(f)+1}</h2>
    <p>
        <div className="form-group">
        <p>
        <label style={{fontSize:22,whiteSpace:"pre-wrap"}}>{f.Question}</label>
        </p>
        <p>
        <img id="imgPreview" src={CheckPreview(f.image)} hidden={CheckPreviewYes(f.image)} width="600px" height="400px"alt='Preview'/>
        </p>
        <div>
        <textarea
          className="form-control"
          id="Text"
          rows="5"
          hidden={CheckTextArea(f.Type)}
          onChange={(event)=>setAnswer(event.target.value,FinalList.indexOf(f))}
        />
        </div>
        <div>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        hidden={CheckMultiple(f.Type)}
        onChange={(event)=>setAnswer(event.target.value,FinalList.indexOf(f))} 
        >
        <FormControlLabel value={helper(f.CSolution,f.fimage)}  control={<Radio />} label={f.CSolution} />
        <p>
        <img id="imgPreview1" src={CheckPreview(f.fimage)} hidden={CheckPreviewYes(f.fimage)} width="600px" height="400px"alt='Preview'/>
        </p>
        <FormControlLabel value={helper(f.WSolution1,f.simage)} control={<Radio />} label={f.WSolution1} />
        <p>
        <img id="imgPreview2" src={CheckPreview(f.simage)} hidden={CheckPreviewYes(f.simage)} width="600px" height="400px"alt='Preview'/>
        </p>
        <FormControlLabel value={helper(f.WSolution2,f.timage)} control={<Radio />} label={f.WSolution2} />
        <p>
        <img id="imgPreview3" src={CheckPreview(f.timage)} hidden={CheckPreviewYes(f.timage)} width="600px" height="400px"alt='Preview'/>
        </p>
        <FormControlLabel value={helper(f.WSolution3,f.foimage)} control={<Radio />} label={f.WSolution3} />
        <p>
        <img id="imgPreview4" src={CheckPreview(f.foimage)} hidden={CheckPreviewYes(f.foimage)} width="600px" height="400px"alt='Preview'/>
        </p>
        </RadioGroup>
        </FormControl>
        </div>
        <div>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        hidden={CheckTF(f.Type)}
        onChange={(event)=>setAnswer(event.target.value,FinalList.indexOf(f))} 
        >
        <FormControlLabel value="True"  control={<Radio />} label="True" />
        <FormControlLabel value="False" control={<Radio />} label="False" />
        </RadioGroup>
        </FormControl>
        </div>
        </div>
    </p>
    <p>
        Grade: {f.Grade} Mark(s)
    </p>
    <p>
    <Button  color="primary" hidden={!(CheckDraw(f.Type))} variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>handleSubmit(FinalList.indexOf(f),f.Type)}>Save</Button>
    </p>
    <p>
    <Button  color="primary" hidden={(CheckDraw(f.Type))} variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>window.open(`/canvas?index=${FinalList.indexOf(f)}`)}>Draw Answer</Button>
    </p>
  </div>
</div>)}
    </div>
    <p>
    <Button fullWidth color="success" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>handleSubmit1()}>Submit Assessment</Button>
    </p>
      </form>
    <p>
    <label style={{marginLeft:420,fontSize:20}} hidden={checkStart(sessionStorage.getItem("start"))}>Please allow the use of camera to start asssessment</label>
    <Button id="start-camera" style={{width:"99%"}} variant="contained" hidden={checkStart(sessionStorage.getItem("start"))} onClick={()=>{start()}}>Start Camera</Button>
    <video id="video" hidden autoPlay></video>
    <canvas id="canvas" hidden width="320" height="240"></canvas>
    </p>
    </div>

</>
    )
}
setInterval(function () {
let canvas = document.querySelector("#canvas");
if(canvas!=undefined)
{
  if(parseInt(sessionStorage.getItem("imageTime"))>=60)
  {
    let video = document.querySelector("#video");
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    // data url of the image
    localStorage.setItem((image_data_url+"").substring(((image_data_url+"").length)-40),image_data_url)
    var StudentImage= JSON.parse(sessionStorage.getItem("StudentImage"))
    StudentImage.push((image_data_url+"").substring(((image_data_url+"").length)-40))
    sessionStorage.setItem("StudentImage",JSON.stringify(StudentImage))
    sessionStorage.setItem("imageTime",0)

    const f = {
      CourseID:sessionStorage.getItem("CourseID"),
      ExamName:sessionStorage.getItem("ExamName"),
      StudentEmail:sessionStorage.getItem("StudentEmail"),
      StudentImage:(image_data_url+"").substring(((image_data_url+"").length)-40)
      }
      axios.post('http://localhost:8000/pastExams/updateImage', f )
      .then(res => res.data)
      .then(data => "SUCCESSFULLY Created")
      .catch(err => "ERROR PLEASE TRY AGAIN")
  }
  sessionStorage.setItem("imageTime",parseInt(sessionStorage.getItem("imageTime"))+1)
}

}, 1000);

export default StartExam;