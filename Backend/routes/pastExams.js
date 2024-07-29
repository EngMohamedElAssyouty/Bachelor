const router = require('express').Router();
let pastExam = require('../models/pastExam');
let exam = require('../models/exam');

router.route('/').get((req, res) => {
    user.find()
        .then(exam =>res.json(exam))
        .catch(err => res.status(400).json('error: ' + err));
    });

router.route ('/create').post(async(req,res) => {
    const {CourseID,ExamID, ExamName, Type, Grade,StudentEmail,StudentGrade,AllAnswers,StudentImage} = req.body;
    const ExamExists = await exam.findOne ({_id: ExamID});
    if(ExamExists){
        const PastExamCreated = await pastExam.create({CourseID,ExamID, ExamName, Type, Grade,StudentEmail,StudentGrade,AllAnswers,StudentImage});
        res.send(PastExamCreated);
    }
    else{
    res.status(500).json({message: "ERROR"})
    }
});
router.route("/SearchResult").post(async(req, res) => {
    const {Email}=req.body;
    let result2=await pastExam.find({StudentEmail: Email});
    res.json(result2);
  
  });
  router.route("/SearchResult2").post(async(req, res) => {
    const {CourseID,ExamName}=req.body;
    let result2=await pastExam.find({CourseID: CourseID,ExamName:ExamName});
    res.json(result2);
  
  });
  router.route("/update").post(async(req, res) => {
    const {CourseID,ExamName,StudentEmail,GradeList}=req.body;
    const PastExamCreated = await pastExam.findOne ({CourseID: CourseID,ExamName:ExamName,StudentEmail:StudentEmail});
    pastExam.findByIdAndUpdate(PastExamCreated._id)
    .then(pastExam =>{
        var sum=0;
        for(var i=0;i<GradeList.length;i++)
        {
            sum+=parseFloat(GradeList[i].Grade);
        }
        pastExam.StudentGrade=sum

     pastExam.save()

        .then(pastExam =>res.json('PastExam Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});

router.route("/updateAnswer").post(async(req, res) => {
    const {CourseID,ExamName,StudentEmail,AnsList}=req.body;
    const PastExamCreated = await pastExam.findOne ({CourseID: CourseID,ExamName:ExamName,StudentEmail:StudentEmail});
    pastExam.findByIdAndUpdate(PastExamCreated._id)
    .then(pastExam =>{
        pastExam.AllAnswers=AnsList

     pastExam.save()

        .then(pastExam =>res.json('PastExam Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});

router.route("/updateImage").post(async(req, res) => {
    const {CourseID,ExamName,StudentEmail,StudentImage}=req.body;
    const PastExamCreated = await pastExam.findOne ({CourseID: CourseID,ExamName:ExamName,StudentEmail:StudentEmail});
    pastExam.findByIdAndUpdate(PastExamCreated._id)
    .then(pastExam =>{
        pastExam.StudentImage.push(StudentImage)

     pastExam.save()

        .then(pastExam =>res.json('PastExam Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
module.exports = router ; 
