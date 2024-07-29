const router = require('express').Router();
let instructor = require('../models/instructor');

router.route('/').get((req, res) => {
instructor.find()
    .then(instructor =>res.json(instructor))
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
  const ListOfCourses = req.body.ListOfCourses;
  const ListOfExams = req.body.ListOfExams;

  const newInstructor= new instructor ({
     Password,
     FirstName,
     LastName,
     Address,
     Email ,
     Gender,
     Type,
     ListOfCourses,
     ListOfExams
  
  });
  
  
  newInstructor.save()
      .then(() => res.json('instructor added'))
      .catch(err => res.status(400).json('error: ' + err));

  });

  router.route ('/register').post(async(req,res) => {
          const {Password, First, Last, Address,Email,Gender,Type } = req.body;
          const instructorExists = await instructor.findOne ({Email: Email});
          const list=[];
          if(instructorExists){
            res.status(500).json({message: "EMAIL ALREADY IN USE!!!"})
          }
          else{
          var FirstName=First.toLowerCase()
          var LastName=Last.toLowerCase()
          const instructorCreated = await instructor.create({Password, FirstName, LastName, Address, Email,Gender,Type,list,list});
          res.send(instructorCreated);
          }
      });
      router.route ('/login').post(async(req,res) => {

        const {Email, Password} = req.body;
        const instructorExists = await instructor.findOne({Email: Email});
        if(!instructorExists){
            res.status(500).json({message:"Logged in"})
        }
        else
        {
            if(instructorExists.Password==Password)
            {
                 res.json({message: "instructor updated"})
            }
            else
            {
                res.status(500).json({message:"Logged in"})
            }
        }
    });

    router.route("/SearchResult").post(async(req, res) => {
    const {Email,Name}=req.body;
    if(Name!="" && Name!=undefined)
    {
        var split=Name.split(" ");
        if(split.length==1)
        {
            const result = await instructor.findOne ({Email: Email});
            let result1=await instructor.find({FirstName:split[0].toLowerCase()});
            let result2=[]
            for(var i=0;i<result1.length;i++)
            {
                if(result1[i].Email!=result.Email)
                    result2.push(result1[i])
            }
            res.json(result2);
        }
        else if(split.length==2){
            const result = await instructor.findOne ({Email: Email});
            let result1=await instructor.find({FirstName:split[0].toLowerCase(),LastName:split[1].toLowerCase()});
            let result2=[]
            for(var i=0;i<result1.length;i++)
            {
                if(result1[i].Email!=result.Email)
                    result2.push(result1[i])
            }
            res.json(result2);
        }
    }
    else{
        const result = await instructor.findOne ({Email: Email});
        let result1=await instructor.find();
        let result2=[]
        for(var i=0;i<result1.length;i++)
        {
            if(result1[i].Email!=result.Email)
                result2.push(result1[i])
        }
        res.json(result2);
    }
      
      });
      router.route("/update").post(async(req, res) => {
        const {ID,Email}=req.body;
        const instructorExists = await instructor.findOne ({Email: Email});
        instructor.findByIdAndUpdate(instructorExists._id)
        .then(instructor =>{instructor.ListOfCourses.push(ID);
 
         instructor.save()
    
            .then(instructor =>res.json('Instructor Updated'))
            .catch(err =>{ console.log(err); });
        })
        .catch(err =>{
            console.log(err);
        });
    });

    router.route("/SearchResult2").post(async(req, res) => {
        const {Email}=req.body;
        let result = await instructor.findOne ({Email: Email});
        res.json(result);
    });

module.exports = router ; 