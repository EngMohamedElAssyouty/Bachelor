import React from 'react';
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from './components/LandingPage';
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage';
import SHomePage from './components/SHomePage';
import Profile from './components/Profile'

import CreateCourse from './components/CreateCourse'
import AddStudents from './components/AddStudents'
import AddBank from './components/AddBank';
import ViewBanks from './components/ViewBanks';
import AddQuestion from './components/AddQuestion';
import AddQuestion2 from './components/AddQuestion2';
import AddQuestion3 from './components/AddQuestion3';
import CreateExam from './components/CreateExam';
import CreateExam2 from './components/CreateExam2';
import CreateExam3 from './components/CreateExam3';
import PostedExams from './components/PostedExams';
import StartExam from './components/StartExam';
import ThankYou from './components/ThankYou';
import Transcript from './components/Transcript';
import PastExams from './components/PastExams';
import PastExams1 from './components/PastExams1';
import PastExams2 from './components/PastExams2';
import PastExams3 from './components/PastExam3';
import PastExams4 from './components/PastExam4';
import EditQM from './components/EditQM';
import EditQ from './components/EditQ';
import MyProfile from './components/MyProfile';
import Canvas from './components/Canvas';
import ViewBanks0 from './components/ViewBanks0';
import CreateExam0 from './components/CreateExam0';
import AddQuestion4 from './components/AddQuestion4';
import EditQT from './components/EditQT';
import AddInstructors from './components/AddInstructors';

function App() {
  return (
    
    
    <Router>
      
      <div className="container">
      <br/>
      <Switch>
      <Route exact path="/about" component={LandingPage} />
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/HomePage" component={HomePage} />
      <Route exact path="/SHomePage" component={SHomePage} />
      <Route exact path="/Profile" component={Profile} />
      <Route exact path="/MyProfile" component={MyProfile} />

      <Route exact path="/createCourse" component={CreateCourse} />
      <Route exact path="/AddInstructors" component={AddInstructors} />
      <Route exact path="/AddStudents" component={AddStudents} />
      <Route exact path="/AddBank" component={AddBank} />
      <Route exact path="/ViewBanks0" component={ViewBanks0} />
      <Route exact path="/ViewBanks" component={ViewBanks} />
      <Route exact path="/AddQuestion" component={AddQuestion} />
      <Route exact path="/AddQuestion2" component={AddQuestion2} />
      <Route exact path="/AddQuestion3" component={AddQuestion3} />
      <Route exact path="/AddQuestion4" component={AddQuestion4} />
      <Route exact path="/createExam0" component={CreateExam0} />
      <Route exact path="/createExam" component={CreateExam} />
      <Route exact path="/createExam2" component={CreateExam2} />
      <Route exact path="/createExam3" component={CreateExam3} />
      <Route exact path="/postedExams" component={PostedExams} />

      <Route exact path="/StartExam" component={StartExam} />
      <Route exact path="/ThankYou" component={ThankYou} />
      <Route exact path="/Transcript" component={Transcript} />
      <Route exact path="/pastExams" component={PastExams} />
      <Route exact path="/pastExams1" component={PastExams1} />
      <Route exact path="/pastExams2" component={PastExams2} />
      <Route exact path="/pastExams3" component={PastExams3} />
      <Route exact path="/pastExams4" component={PastExams4} />

      <Route exact path="/EditQM" component={EditQM} />
      <Route exact path="/EditQ" component={EditQ} />
      <Route exact path="/EditQT" component={EditQT} />

      <Route exact path="/canvas" component={Canvas} />
      </Switch>
      
      
      
      </div>
    </Router>
    
  );
}

export default App;
