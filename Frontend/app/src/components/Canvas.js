import React, { Component } from 'react';
//import "react-datepicker/dist/react-datepicker.css";
import './Canvas.css';
import {Button} from '@mui/material';
import queryString from 'query-string'
import { ToastContainer,toast } from "react-toastify";

const Canvas=()=>{
var AnsList= JSON.parse(localStorage.getItem("AnsList"))
var {index}=queryString.parse(window.location.search);
sessionStorage.setItem("index",index)

const handleSubmit=()=>{
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

    };
    const handleSubmit1=()=>{
        let canvas = document.getElementById("drawing-board");
        let image_data_url = canvas.toDataURL();

        localStorage.setItem((image_data_url+"").substring(((image_data_url+"").length)-40),image_data_url)
        var index=sessionStorage.getItem("index")
        AnsList[index].Answer=(image_data_url+"").substring(((image_data_url+"").length)-40)
        localStorage.setItem("AnsList",JSON.stringify(AnsList))
        toast("Successfully submitted question")
        window.close();
    };
return(
    <>
    <Button  color='success' variant="contained" onClick={()=>handleSubmit()}>Enable tool</Button>
    <div className="container-fluid p-5 text-center">
    <body1>
    <section class="container1">
        <div id="toolbar">
            <h7>Draw</h7>
            <label for="stroke">Stroke</label>
            <input id="stroke" name='stroke' type="color"/>
            <label for="lineWidth">Line Width</label>
            <input id="lineWidth" name='lineWidth' type="number" defaultValue={1} />
            <Button fullWidth style={{backgroundColor:"red"}} id="clear">Clear</Button>
            <p>
            <Button  color='warning' variant="contained" fullWidth onClick={()=>handleSubmit1()}>Save</Button>
            </p>
        </div>
        <div class="drawing-board">
            <canvas id="drawing-board"  style={{background:"white"}}></canvas>
        </div>
    </section>  
    </body1>  
    </div>
    </>
        )
    }
export default Canvas;