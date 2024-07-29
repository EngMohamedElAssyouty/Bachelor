import React from 'react';
import {useState} from "react";
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useHistory} from 'react-router-dom';

const Register=()=>{
  const theme = createTheme();
    const[Password,setPassword]=useState("");
    const[FirstName,setFirstName]=useState("");
    const[LastName,setLastName]=useState("");
    const[Address,setAddress]=useState("");
    const[Email,setEmail]=useState("");
    const[Type,setType]=useState("Choose");
    const[Gender,setGender]=useState("Gender");
    const history=useHistory();
    const clickSubmit= async function(event){
      event.preventDefault(event);
      if(Password!=="" &&FirstName!=="" &&LastName!=="" &&Address!=="" &&Email!==""  && Type!=="Choose"  && Gender!=="Gender")  
        {
            const f = {
                Password: Password,
                First: FirstName,
                Last: LastName,
                Address: Address,
                Email:Email,
                Gender:Gender,
                Type:Type
              }
              console.log(f);
              if(Type=="Student")
              {
                axios.post('http://localhost:8000/students/register', f )
                .then(res => res.data)
                .then(data => toast("SUCCESSFULLY SIGNED UP"))
                .catch(err => toast("EMAIL ALREADY TAKEN TRY AGAIN"))
                history.push(`/`);
              }
              else
              {
                axios.post('http://localhost:8000/instructors/register', f )
                .then(res => res.data)
                .then(data => toast("SUCCESSFULLY SIGNED UP"))
                .catch(err => toast("EMAIL ALREADY TAKEN TRY AGAIN"))
                history.push(`/`);
              }
        }
        else{
          toast("Error-(Missing required data)");
        }
    };
    return(
<ThemeProvider theme={theme}>
             <ToastContainer position="top-center" />
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <Box component="form" onSubmit={clickSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="FirstName"
                    autoComplete="email"
                    autoFocus
                    value={FirstName}
                    onChange={(event)=>setFirstName(event.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    autoComplete="current-password"
                    value={LastName}
                    onChange={(event)=>setLastName(event.target.value)}
                  />
                   <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Home Address"
                    value={Address}
                    onChange={(event)=>setAddress(event.target.value)}
                  />
                  <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Gender}
    autoComplete="Gender"
    label="Gender"
    fullWidth
    onChange={(event)=>setGender(event.target.value)}
  >
    <MenuItem value="Instructor">Male</MenuItem>
    <MenuItem value="Student">Female</MenuItem>
  </Select>
  <InputLabel id="demo-simple-select-label">Role *</InputLabel>
     <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Type}
    label="Role"
    fullWidth
    onChange={(event)=>setType(event.target.value)}
  >
    <MenuItem value="Instructor">Instructor</MenuItem>
    <MenuItem value="Student">Student</MenuItem>
    
  </Select>
  <TextField
                    margin="normal"
                    required
                    fullWidth
                    
                    label="Email"
                    autoComplete="current-password"
                    value={Email}
                    onChange={(event)=>setEmail(event.target.value)}
                  />


  

<TextField
                    margin="normal"
                    required
                    fullWidth
                    type='password'
                    label="Password"
                    autoComplete="current-password"
                    value={Password}
                    onChange={(event)=>setPassword(event.target.value)}
                  />


                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                 
                </Box>
              </Box>
             
            </Container>
          </ThemeProvider>
    )
}
export default Register;