import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Navbar from "./navbar";

const AddCourse=()=>{
    const[ID,setID]=useState("");
    const[CreditHours,setCreditHourse]=useState("");
    const history=useHistory();
    const handleSubmit=()=>{
      if(ID!=="" &&CreditHours!="")  
        {
            sessionStorage.setItem("CourseID", ID)
            sessionStorage.setItem("CreditHours", CreditHours)
            history.push(`/AddInstructors`);
        }
    };
return(
    <>
    <div>
    <Navbar/>
          <h2>Add Course</h2>
          <form>
          <div className="Card">
    
            <div>
            <input type="text" placeholder="ID"
            onChange={(event)=>setID(event.target.value)} value={ID}
            style={{height:"30px", width:"200px"}}/>
            </div>  
    </div>
            <div>
            <input type="number" min="0" placeholder="Credit Hours"
            onChange={(event)=>setCreditHourse(event.target.value)} value={CreditHours}
            style={{height:"30px", width:"200px"}}/>
            </div>  
            <div>
            <button className="btn btn-primary"  onClick={()=>{handleSubmit()}}>Add Instructors</button>
            </div>
          </form>
        </div>
    
    </>
        )
    }
    export default AddCourse;