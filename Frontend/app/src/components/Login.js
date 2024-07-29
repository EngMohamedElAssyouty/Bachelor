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

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useHistory} from 'react-router-dom';
import { FormControl } from '@mui/material';
const Login=()=>{
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const[Type,setType]=useState("");
    sessionStorage.clear()
    const history=useHistory(); 
    const theme = createTheme();

     
    const clickSubmit= async function(event){
        event.preventDefault(event);
       try {
        if(Email!="" &&Password!="" && Type!="")  
        {
          const f = {
            Email: Email,
            Password: Password
          }
          if(Type=="Instructor"){
              axios.post('http://localhost:8000/instructors/login', f )
              .then(history.push(`/HomePage`))
              .catch(err=>history.push("/")&window.alert("INCORRECT PASSWORD/USERNAME"))
              sessionStorage.setItem("InstructorEmail", Email)
              sessionStorage.setItem("type", "Instructor")
          }
              if(Type=="Student")
              {
                axios.post('http://localhost:8000/students/login', f )
              .then(history.push(`/SHomePage`))
              .catch(err=>history.push("/")&window.alert("INCORRECT PASSWORD/USERNAME"))
              sessionStorage.setItem("StudentEmail", Email)
              sessionStorage.setItem("type", "Student")
              }
        }
        else{
          toast("Error-(Missing required data)");
        }
     
       }
       
       catch(err){
         if(err.response.status===400) toast("Error");
       }
      }
         return (
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
                  Sign in
                </Typography>
                <Box component="form" onSubmit={clickSubmit}  noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    
                    label="Email"
                    
                    autoComplete="email"
                    autoFocus
                    value={Email}
                    onChange={(event)=>setEmail(event.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    label="Password"
              
                    autoComplete="current-password"
                    value={Password}
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                  <FormControl sx={{ minWidth:"100%" }}>
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
  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs> 
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
             
            </Container>
          </ThemeProvider>
        );
}

export default Login;