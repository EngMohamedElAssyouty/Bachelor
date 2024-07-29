const router = require('express').Router();
let exam = require('../models/exam');
let course = require('../models/course');
let instructor = require('../models/instructor');
import nodemailer from 'nodemailer';

router.route('/').get((req, res) => {
    user.find()
        .then(exam =>res.json(exam))
        .catch(err => res.status(400).json('error: ' + err));
    });

router.route ('/create').post(async(req,res) => {
    const {CourseID, ExamName, Type, Grade,StartTime,EndTime,Duration,listofQuestions,AllQuestions} = req.body;
    const CourseExists = await course.findOne ({CourseID: CourseID});
    if(CourseExists){
        const examCreated = await exam.create({CourseID, ExamName, Type, Grade,StartTime,EndTime,Duration,listofQuestions,AllQuestions});
        res.send(examCreated._id);
    }
    else{
    res.status(500).json({message: "ERROR"})
    }
});
router.route("/delete").post(async(req, res) => {
    const {ID}=req.body;
    exam.findByIdAndDelete(ID)
    .then(exam => res.json('exam Deleted'))
    .catch(err =>{
        console.log(err);
    });
    });
router.route("/SearchResult").post(async(req, res) => {
    const {Email}=req.body;
    const instructorCreated = await instructor.findOne ({Email: Email});
    let result2=await exam.find({CourseID: instructorCreated.ListOfCourses});
    res.json(result2);
  
  });
  router.route("/SearchResult2").post(async(req, res) => {
    const {Email}=req.body;
    const CourseExists = await course.find ({Students: Email});
    if(CourseExists)
    {
      var finalResult=[];
      for(var n=0 ;n<CourseExists.length;n++)
      {
        var result2=[]
        var result=await exam.find({CourseID: CourseExists[n].ID});
        for(var i=0;i<result.length;i++)
        {
          var StartTime=result[i].StartTime
          var EndTime =result[i].EndTime
          if(Number(new Date())<=Number(new Date(EndTime)))
          {
            var result3=[]
            if(result2.length==0)
            {
              result3.push(result[i])
            }
            else{
              var flag1=-1;
              for(var j=0;j<result2.length;j++)
              {
                if(Number(result2[j].StartTime)>Number(StartTime))
                {
                  result3.push(result[i])
                  flag1=j;
                  break;
                }
                else
                {
                  result3.push(result2[j])
                }
              }
              if(flag1!=-1)
              {
                for(var k=flag1;k<result2.length;k++)
                {
                  result3.push(result2[k])
                }
              }
              else
              {
                result3.push(result[i])
              }
            }
            result2=result3;
          }
        }
        for(var n1=0;n1<result2.length;n1++)
        {
          finalResult.push(result2[n1]);
        }
      }
      res.json(finalResult);
    }
    else
    {
      res.status(500).json({message: "EXAM DOES NOT EXIST!!!"})
    }
    
  
  });
  router.route("/SearchResult3").post(async(req, res) => {
    const {CourseID}=req.body;
    let result2=await exam.find({CourseID: CourseID});
    res.json(result2);
  
  });
  router.route('/email').post(async(req, res) => {
    const {Email,Type,Grade,CourseID,StartTime,Duration} = req.body;
    const CourseExists = await course.findOne ({ID: CourseID});
    for(var i=0;i<CourseExists.Students.length;i++)
    {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mennaelnemr7@gmail.com',
        pass: 'vhunmdintdtxutcq'
      }
    });
    
    var mailOptions = {
      from: 'mennaelnemr7@gmail.com',
      to: CourseExists.Students[i],
      subject: 'Upcoming Exam',
      text: 'Your '+Type+' is on '+StartTime+ ' and the Duration is '+Duration+ ' minutes, The exam is out of '+Grade
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }
    
    });
module.exports = router ; 
