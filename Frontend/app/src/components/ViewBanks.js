import axios from 'axios';
import {useState,useEffect} from 'react';
import queryString from 'query-string'
import React from 'react';
import {useHistory} from 'react-router-dom';
import Menu from './Menu'
import Button from '@mui/material/Button';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormLabel from '@mui/material/FormLabel';
import CircleIcon from '@mui/icons-material/Circle';
import ListIcon from '@mui/icons-material/List';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import GestureIcon from '@mui/icons-material/Gesture';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';

const ViewBanks=()=>{
  const[QuestionBanks,setQuestionBanks]=useState([]);
  const history=useHistory();
  useEffect(()=>{
    const {ID,CourseID, Title,EasyQuestions,MediumQuestions,HardQuestions}=queryString.parse(window.location.search);
        AllQuestionBanks({ID,CourseID, Title,EasyQuestions,MediumQuestions,HardQuestions})
        .then(res=>{
            setQuestionBanks(res.data);
            })
            
    },[window.location.search]);
    const f = {CourseID: sessionStorage.getItem("CID"),ID: sessionStorage.getItem("QID")}
    const AllQuestionBanks = async (query)=> await axios.post("http://localhost:8000/questionBanks/SearchResult1",f);
    
    const EditE=(index,Type,ID,CourseID,Question,CSolution,WSolution1,WSolution2,WSolution3,QAnswer,Title,image)=>{
      sessionStorage.setItem("QID",ID)
      sessionStorage.setItem("CID",CourseID)
      sessionStorage.setItem("index",index)
      sessionStorage.setItem("level","Easy")
      sessionStorage.setItem("type",Type)
      sessionStorage.setItem("Question",Question)
      sessionStorage.setItem("CSolution",CSolution)
      sessionStorage.setItem("WSolution1",WSolution1)
      sessionStorage.setItem("WSolution2",WSolution2)
      sessionStorage.setItem("WSolution3",WSolution3)
      sessionStorage.setItem("QAnswer",QAnswer)
      sessionStorage.setItem("Title",Title)
      sessionStorage.setItem("Qimage",image)
      if(Type=="Multiple")
      {
        history.push("/EditQM")
      }
      else if(Type=="T/F")
      {
        history.push("/EditQT")
      }
      else
      {
        history.push("/EditQ")
      }
      
    };
    const EditM=(index,Type,ID,CourseID,Question,CSolution,WSolution1,WSolution2,WSolution3,QAnswer,Title,image)=>{
      sessionStorage.setItem("QID",ID)
      sessionStorage.setItem("CID",CourseID)
      sessionStorage.setItem("index",index)
      sessionStorage.setItem("level","Medium")
      sessionStorage.setItem("type",Type)
      sessionStorage.setItem("Question",Question)
      sessionStorage.setItem("CSolution",CSolution)
      sessionStorage.setItem("WSolution1",WSolution1)
      sessionStorage.setItem("WSolution2",WSolution2)
      sessionStorage.setItem("WSolution3",WSolution3)
      sessionStorage.setItem("QAnswer",QAnswer)
      sessionStorage.setItem("Title",Title)
      sessionStorage.setItem("Qimage",image)
      if(Type=="Multiple")
      {
        history.push("/EditQM")
      }
      else if(Type=="T/F")
      {
        history.push("/EditQT")
      }
      else
      {
        history.push("/EditQ")
      }
    };
    const EditH=(index,Type,ID,CourseID,Question,CSolution,WSolution1,WSolution2,WSolution3,QAnswer,Title,image)=>{
      sessionStorage.setItem("QID",ID)
      sessionStorage.setItem("CID",CourseID)
      sessionStorage.setItem("index",index)
      sessionStorage.setItem("level","Hard")
      sessionStorage.setItem("type",Type)
      sessionStorage.setItem("Question",Question)
      sessionStorage.setItem("CSolution",CSolution)
      sessionStorage.setItem("WSolution1",WSolution1)
      sessionStorage.setItem("WSolution2",WSolution2)
      sessionStorage.setItem("WSolution3",WSolution3)
      sessionStorage.setItem("QAnswer",QAnswer)
      sessionStorage.setItem("Title",Title)
      sessionStorage.setItem("Qimage",image)
      if(Type=="Multiple")
      {
        history.push("/EditQM")
      }
      else if(Type=="T/F")
      {
        history.push("/EditQT")
      }
      else
      {
        history.push("/EditQ")
      }
    };

    const CheckPre=(Answer)=>{
      var recentImageDataUrl =localStorage.getItem(Answer)
      if(recentImageDataUrl==undefined)
      {
        return false;
      }
      else 
      {
        return true;
      }
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
    const CheckTypeM=(type)=>{
      if(type=="Multiple")
          return false;
      else
          return true;    
  };

  const CheckTypeT=(type)=>{
    if(type=="Text")
      return false;
    else
      return true;    
};

const CheckTypeTF=(type)=>{
  if(type=="T/F")
      return false;
  else
      return true;    
};

const CheckTypeD=(type)=>{
  if(type=="Drawing")
  return false;
  else
      return true;   
};

    const Check=(QuestionBanks)=>{
      if(QuestionBanks.length==0)
          return false;
      else
          return true;    
  };
  const Check2=(QuestionBanks)=>{
    if(QuestionBanks.length==0)
        return "";
    else
        return QuestionBanks[0].Title;    
};
const Check3=(QuestionBanks)=>{
  if(QuestionBanks.length==0)
      return "";
  else
      return QuestionBanks[0].EasyQuestions.length+QuestionBanks[0].MediumQuestions.length+QuestionBanks[0].HardQuestions.length;    
};
    const EditBank=(ID,CourseID)=>{
        sessionStorage.setItem("QID",ID)
        sessionStorage.setItem("CID",CourseID)
        sessionStorage.setItem("Title",QuestionBanks[0].Title)
        history.push(`/AddQuestion`)
    };
    const handle=(Question,QID,Level)=>{
      const f = {
        CourseID:sessionStorage.getItem("CID"),
        Question:Question,
        QID: QID,
        Level:Level
        }
      axios.post('http://localhost:8000/questionBanks/deleteQuestion', f )
      .then(res => toast("DELETED"))
      .then(data => window.location.reload())
      .catch(err => toast("ERROR"))
  };

    return(
<>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" >
<Button className="card text-center" style={{backgroundColor:'blue', color:"white", width:"20%",marginRight:20,textTransform:'none'}} onClick={()=>{history.push("/ViewBanks0")}}>
  <h3>{sessionStorage.getItem("CID")}</h3>
</Button>
<div className="card text-center" style={{backgroundColor:'orange', color:"white", width:"20%",marginRight:20}}>
  <h3 hidden={!Check(QuestionBanks)}>{Check2(QuestionBanks)}</h3>
</div>
<div className="card text-center" style={{backgroundColor:'purple', color:"white", width:"20%"}}>
  <h3 hidden={!Check(QuestionBanks)}>{Check3(QuestionBanks)} Questions</h3>
</div>
</div>
    <div className="container-fluid p-5 text-center"> 

    <div className="container-fluid p-5">
    <div>
        <FormLabel style={{fontSize:25}} hidden={Check(QuestionBanks)}>No Question Banks Created</FormLabel>
    </div>
    <div className="row" >
      {QuestionBanks.map((f)=><div className="card border border-dark mb-3"   style={{width:"100%"}} key={f.id} f={f}>

  <div className="card-body">
    <p className="card-text">
    <p>
    <Button fullWidth color="success" variant="contained"sx={{ mt: 1, mb: 1 }}onClick={()=>{EditBank(f.ID,f.CourseID)}}>Add Question</Button>
    </p>
    <p>
    {f.EasyQuestions.map((f1)=><div className="card border border-dark mb-3"   style={{width:"100%"}} key={f1.id} f1={f1} >
    <div className="card-body">
    <Button  onClick={()=>{if(window.confirm("Confirm Delete"))handle(f1,f.ID,"Easy")}} endIcon={<HighlightOffIcon position="top-right"  style={{color:"red"}} sx={{ ml: 125 }} fontSize="large" />}></Button>
    <CircleIcon color='success'></CircleIcon>
    <ListIcon hidden={CheckTypeM(f1.Type)}></ListIcon>
    <TextFieldsIcon hidden={CheckTypeT(f1.Type)}></TextFieldsIcon>
    <GestureIcon hidden={CheckTypeD(f1.Type)}></GestureIcon>
    <RuleFolderIcon hidden={CheckTypeTF(f1.Type)}></RuleFolderIcon>
    <p className="card-text">
    <p>
      <label style={{whiteSpace:"pre-wrap"}}>{f1.Question}</label>  
    </p>
    <p>
    <img id="imgPreview1" src={CheckPreview(f1.image)} hidden={CheckPreviewYes(f1.image)} width="100%" height="100%"alt='Preview'/>
    </p>
    <p hidden={CheckTypeM(f1.Type)}>
      <p hidden={!(CheckPreviewYes(f1.fimage)&&CheckPreviewYes(f1.simage))||!(CheckPreviewYes(f1.timage)&&CheckPreviewYes(f1.foimage))}>
      1: {f1.CSolution} 
      <span>&nbsp;</span> <span>&nbsp;</span> 
      2: {f1.WSolution1}
      <span>&nbsp;</span> <span>&nbsp;</span> 
      3: {f1.WSolution2}
      <span>&nbsp;</span> <span>&nbsp;</span> 
      4: {f1.WSolution3}
    </p>
      <p hidden={CheckPreviewYes(f1.fimage)&&CheckPreviewYes(f1.simage)}>
      1: <img id="imgPreview2" src={CheckPreview(f1.fimage)} hidden={CheckPreviewYes(f1.fimage)} width="45%" height="100%"alt='Preview'/>
      2: <img id="imgPreview3" src={CheckPreview(f1.simage)} hidden={CheckPreviewYes(f1.simage)} width="45%" height="100%"alt='Preview'/>
      </p>
      <p hidden={CheckPreviewYes(f1.timage)&&CheckPreviewYes(f1.foimage)}> 
      3: <img id="imgPreview4" src={CheckPreview(f1.timage)} hidden={CheckPreviewYes(f1.timage)} width="45%" height="100%"alt='Preview'/>
      4: <img id="imgPreview5" src={CheckPreview(f1.foimage)} hidden={CheckPreviewYes(f1.foimage)} width="45%" height="100%"alt='Preview'/>
      </p>
      <br/>
      <h5 hidden={CheckPre(f1.QAnswer)}>Answer: {f1.QAnswer}</h5>
      <h5 hidden={!CheckPre(f1.QAnswer)}>Answer: 
      <img id="imgPreview5" src={CheckPreview(f1.QAnswer)} width="45%" height="100%"alt='Preview'/>
      </h5>
    </p>
    <p hidden={CheckTypeTF(f1.Type)}>
      <p>
      <h5>Answer: {f1.QAnswer}</h5>
      </p>
    </p>
    <p>
      <Button style={{width:"30%"}} variant="contained"  color='primary'onClick={()=>{EditE(f.EasyQuestions.indexOf(f1),f1.Type,f.ID,f.CourseID,f1.Question,f1.CSolution,f1.WSolution1,f1.WSolution2,f1.WSolution3,f1.QAnswer,QuestionBanks[0].Title,f1.image)}}>Edit</Button>
    </p>
    </p>
    </div>
    </div>)}
    </p>
    <p>
    {f.MediumQuestions.map((f2)=><div className="card border border-dark mb-3"   style={{width:"100%"}} key={f2.id} f2={f2} >
    <div className="card-body">
    <Button  onClick={()=>{if(window.confirm("Confirm Delete"))handle(f2,f.ID,"Medium")}}  endIcon={<HighlightOffIcon position="top-right"  style={{color:"red"}} sx={{ ml: 125 }} fontSize="large" />}></Button>
    <CircleIcon color='warning'></CircleIcon>
    <ListIcon hidden={CheckTypeM(f2.Type)}></ListIcon>
    <TextFieldsIcon hidden={CheckTypeT(f2.Type)}></TextFieldsIcon>
    <GestureIcon hidden={CheckTypeD(f2.Type)}></GestureIcon>
    <RuleFolderIcon hidden={CheckTypeTF(f2.Type)}></RuleFolderIcon>
    <p className="card-text">
    <p>
    <label style={{whiteSpace:"pre-wrap"}}>{f2.Question}</label>   
    </p>
    <p>
    <img id="imgPreview6" src={CheckPreview(f2.image)} hidden={CheckPreviewYes(f2.image)} width="100%" height="100%"alt='Preview'/>
    </p>
    <p hidden={CheckTypeM(f2.Type)}>
      <p hidden={!(CheckPreviewYes(f2.fimage)&&CheckPreviewYes(f2.simage))||!(CheckPreviewYes(f2.timage)&&CheckPreviewYes(f2.foimage))}>
      1: {f2.CSolution} 
      <span>&nbsp;</span> <span>&nbsp;</span> 
      2: {f2.WSolution1}
      <span>&nbsp;</span> <span>&nbsp;</span> 
      3: {f2.WSolution2}
      <span>&nbsp;</span> <span>&nbsp;</span> 
      4: {f2.WSolution3}
      </p>
      <p hidden={CheckPreviewYes(f2.fimage)&&CheckPreviewYes(f2.simage)}>
      1: <img id="imgPreview2" src={CheckPreview(f2.fimage)} hidden={CheckPreviewYes(f2.fimage)} width="45%" height="100%"alt='Preview'/>
      2: <img id="imgPreview3" src={CheckPreview(f2.simage)} hidden={CheckPreviewYes(f.simage)} width="45%" height="100%"alt='Preview'/>
      </p>
      <p hidden={CheckPreviewYes(f2.timage)&&CheckPreviewYes(f2.foimage)}> 
      3: <img id="imgPreview4" src={CheckPreview(f2.timage)} hidden={CheckPreviewYes(f2.timage)} width="45%" height="100%"alt='Preview'/>
      4: <img id="imgPreview5" src={CheckPreview(f2.foimage)} hidden={CheckPreviewYes(f2.foimage)} width="45%" height="100%"alt='Preview'/>
      </p>
      <br/>
      <h5 hidden={CheckPre(f2.QAnswer)}>Answer: {f2.QAnswer}</h5>
      <h5 hidden={!CheckPre(f2.QAnswer)}>Answer: 
      <img id="imgPreview5" src={CheckPreview(f2.QAnswer)} width="45%" height="100%"alt='Preview'/>
      </h5>
    </p>
    <p hidden={CheckTypeTF(f2.Type)}>
      <p>
      <h5>Answer: {f2.QAnswer}</h5>
      </p>
    </p>
    <p>
      <Button style={{width:"30%"}} variant="contained"  color='primary'onClick={()=>{EditM(f.MediumQuestions.indexOf(f2),f2.Type,f.ID,f.CourseID,f2.Question,f2.CSolution,f2.WSolution1,f2.WSolution2,f2.WSolution3,f2.QAnswer,QuestionBanks[0].Title,f2.image)}}>Edit</Button>
    </p>
    </p>
    </div>
    </div>)}
    </p>
    <p>
    {f.HardQuestions.map((f3)=><div className="card border border-dark mb-3"   style={{width:"100%"}} key={f3.id} f3={f3} >
    <div className="card-body">
    <Button  onClick={()=>{if(window.confirm("Confirm Delete"))handle(f3,f.ID,"Hard")}}  endIcon={<HighlightOffIcon position="top-right"  style={{color:"red"}} sx={{ ml: 125 }} fontSize="large" />}></Button>
    <CircleIcon color='error'></CircleIcon>
    <ListIcon hidden={CheckTypeM(f3.Type)}></ListIcon>
    <TextFieldsIcon hidden={CheckTypeT(f3.Type)}></TextFieldsIcon>
    <GestureIcon hidden={CheckTypeD(f3.Type)}></GestureIcon>
    <RuleFolderIcon hidden={CheckTypeTF(f3.Type)}></RuleFolderIcon>
    <p className="card-text">
    <p>
    <label style={{whiteSpace:"pre-wrap"}}>{f3.Question}</label>   
    </p>
    <p>
    <img id="imgPreview11" src={CheckPreview(f3.image)} hidden={CheckPreviewYes(f3.image)} width="100%" height="100%"alt='Preview'/>
    </p>
    <p hidden={CheckTypeM(f3.Type)}>
      <p hidden={!(CheckPreviewYes(f3.fimage)&&CheckPreviewYes(f3.simage))||!(CheckPreviewYes(f3.timage)&&CheckPreviewYes(f3.foimage))}>
      1: {f3.CSolution} 
      <span>&nbsp;</span> <span>&nbsp;</span> 
      2: {f3.WSolution1}
      <span>&nbsp;</span> <span>&nbsp;</span> 
      3: {f3.WSolution2}
      <span>&nbsp;</span> <span>&nbsp;</span> 
      4: {f3.WSolution3}
      </p>
      <p hidden={CheckPreviewYes(f3.fimage)&&CheckPreviewYes(f3.simage)}>
      1: <img id="imgPreview2" src={CheckPreview(f3.fimage)} hidden={CheckPreviewYes(f3.fimage)} width="45%" height="100%"alt='Preview'/>
      2: <img id="imgPreview3" src={CheckPreview(f3.simage)} hidden={CheckPreviewYes(f3.simage)} width="45%" height="100%"alt='Preview'/>
      </p>
      <p hidden={CheckPreviewYes(f3.timage)&&CheckPreviewYes(f3.foimage)}> 
      3: <img id="imgPreview4" src={CheckPreview(f3.timage)} hidden={CheckPreviewYes(f3.timage)} width="45%" height="100%"alt='Preview'/>
      4: <img id="imgPreview5" src={CheckPreview(f3.foimage)} hidden={CheckPreviewYes(f3.foimage)} width="45%" height="100%"alt='Preview'/>
      </p>
      <br/>
      <h5 hidden={CheckPre(f3.QAnswer)}>Answer: {f3.QAnswer}</h5>
      <h5 hidden={!CheckPre(f3.QAnswer)}>Answer: 
      <img id="imgPreview5" src={CheckPreview(f3.QAnswer)} width="45%" height="100%"alt='Preview'/>
      </h5>
    </p>
    <p hidden={CheckTypeTF(f3.Type)}>
      <p>
      <h5>Answer: {f3.QAnswer}</h5>
      </p>
    </p>
    <p>
      <Button style={{width:"30%"}} variant="contained"  color='primary'onClick={()=>{EditH(f.HardQuestions.indexOf(f3),f3.Type,f.ID,f.CourseID,f3.Question,f3.CSolution,f3.WSolution1,f3.WSolution2,f3.WSolution3,f3.QAnswer,QuestionBanks[0].Title,f3.image)}}>Edit</Button>
    </p>
    </p>
    </div>
    </div>)}
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
export default ViewBanks;