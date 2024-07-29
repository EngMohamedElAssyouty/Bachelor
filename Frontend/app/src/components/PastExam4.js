import React from 'react';
import {useHistory} from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu'
import Button from '@mui/material/Button';

const PastExams4=()=>{
    var SImages=JSON.parse(sessionStorage.getItem("SImages"))

    const history=useHistory();
    const handleSubmit=()=>{
        history.push("/pastExams2")
    }
    return(
<>
<Menu/>
<ToastContainer position="top-center" />
<div className="row" style={{marginBottom:20}}>
    <Button className="card text-center" style={{backgroundColor:'blue', color:"white", width:"18%",marginRight:23,textTransform:'none'}} onClick={()=>{history.push("/pastExams1")}}>
      <h3>{sessionStorage.getItem("CourseID")}</h3>
    </Button>
    <Button className="card text-center" style={{backgroundColor:'orange', color:"white", width:"18%",marginRight:23,textTransform:'none'}} onClick={()=>{history.push("/pastExams2")}}>
      <h3>{sessionStorage.getItem("ExamName")}</h3>
    </Button>
    <div className="card text-center" style={{backgroundColor:'black', color:"white", width:"58.5%",marginRight:23}}>
      <h3>{sessionStorage.getItem("Email")}</h3>
    </div>
    </div>
    <div className="container-fluid p-5 text-center"> 
    <div className="container-fluid p-5">
   
    <div className="row" >
      {SImages.map((f)=><div className="card border border-dark mb-3" style={{width:"48%",marginRight:20}} key={f.id} f={f}>

  <div className="card-body">
    <h5 className="card-title">{SImages.indexOf(f)+1}</h5>
    <p className="card-text">
    <p>
        <img id="imgPreview" src={localStorage.getItem(f)}  width="100%" height="100%"alt='Preview'/>
    </p> 
    </p>
  </div>
</div>)}
    </div>
    <p>
    <Button style={{width:"25%"}} variant="contained"sx={{ mt: 1, mb: 1 }} color="warning" onClick={()=>{handleSubmit()}}>Back</Button>
    </p>
    </div>
    </div>

</>
    )
}
export default PastExams4;