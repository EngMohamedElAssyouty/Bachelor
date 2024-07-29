const router = require('express').Router();
let student = require('../models/student');
let course = require('../models/course');

router.route('/').get((req, res) => {
student.find()
    .then(student =>res.json(student))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route ('/add').post((req,res) => {
  const Password = req.body.Password;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Address = req.body.Address;
  const Email = req.body.Email;
  const Gender = req.body.Gender;
  const Type = req.body.Type;

  const newStudent= new student ({
     Password,
     FirstName,
     LastName,
     Address,
     Email ,
     Gender,
     Type
  
  });
  
  
  newStudent.save()
      .then(() => res.json('student added'))
      .catch(err => res.status(400).json('error: ' + err));

  });

  router.route ('/register').post(async(req,res) => {
          const {Password, First, Last, Address,Email,Gender,Type } = req.body;
          const studentExists = await student.findOne ({Email: Email});
          if(studentExists){
            res.status(500).json({message: "EMAIL ALREADY IN USE!!!"})
          }
          else{
            var FirstName=First
            var LastName=Last
          const studentCreated = await student.create({Password, FirstName, LastName, Address, Email,Gender,Type});
          res.send(studentCreated);
          }
      });
      router.route ('/login').post(async(req,res) => {

        const {Email, Password} = req.body;
        const studentExists = await student.findOne({Email: Email});
        if(!studentExists){
            res.status(500).json({message:"Logged in"})
        }
        else
        {
            if(studentExists.Password==Password)
            {
                 res.json({message: "User updated"})
            }
            else
            {
                res.status(500).json({message:"Logged in"})
            }
        }
    });
    router.route("/findandupdate").post(async(req, res) => {
        const {listOfStudents,CourseID} = req.body;
        var x=true;
        for(var i=0;i<listOfStudents.length;i++)
        {
            const studentExists = await student.findOne({Email: listOfStudents[i]});
            if(studentExists==undefined)
                x=false;
        }
        if(x)
        {
            const CourseExists = await course.findOne ({ID: CourseID});
            course.findByIdAndUpdate(CourseExists._id)
            .then(course =>{
                for(var j=0;j<listOfStudents.length;j++)
                {
                    if(!(course.Students.includes(listOfStudents[j])))
                        course.Students.push(listOfStudents[j]);
                }
     
             course.save()
        
                .then(course =>res.json('Course Updated'))
                .catch(err =>{ console.log(err); });
            })
            .catch(err =>{
                console.log(err);
            });
        }
        else{
            res.status(500).json({message:"Logged in"})
        }
      
      });

      router.route("/SearchResult2").post(async(req, res) => {
        const {Email}=req.body;
        let result = await student.findOne ({Email: Email});
        res.json(result);
    });

module.exports = router ; 