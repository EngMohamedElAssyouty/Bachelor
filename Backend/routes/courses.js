const router = require('express').Router();
let course = require('../models/course');

router.route('/').get((req, res) => {
    user.find()
        .then(course =>res.json(course))
        .catch(err => res.status(400).json('error: ' + err));
    });

router.route ('/add').post(async(req,res) => {
    const {ID,CourseName,CreditHours,Instructors,Students,QuestionBanks} = req.body;
    const CourseExists = await course.findOne ({ID: ID});
    if(CourseExists){
        res.status(500).json({message: "EMAIL ALREADY IN USE!!!"})
    }
    else{
    const CourseCreated = await course.create({ID,CourseName,CreditHours,Instructors,Students,QuestionBanks});
        res.send(CourseCreated);
    }
});
router.route("/SearchResult").post(async(req, res) => {
    const {Email}=req.body;
    let result2=await course.find({Instructors: Email});
    res.json(result2);
  
  });

  router.route("/update").post(async(req, res) => {
    const {CourseID}=req.body;
    const CourseExists = await course.findOne ({ID: CourseID});
    course.findByIdAndUpdate(CourseExists._id)
    .then(course =>{course.QuestionBanks++;

     course.save()

        .then(course =>res.json('Course Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/findandupdate").post(async(req, res) => {
    const {Email,CourseID}=req.body;
    const CourseExists = await course.findOne ({ID: CourseID});
    course.findByIdAndUpdate(CourseExists._id)
    .then(course =>{course.Instructors.push(Email);

     course.save()

        .then(course =>res.json('Course Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/delete").post(async(req, res) => {
    const {CourseID}=req.body;
    course.findByIdAndDelete(CourseID)
    .then(course => res.json('Course Deleted'))
    .catch(err =>{
        console.log(err);
    });
});
module.exports = router ; 