const router = require('express').Router();
let exam = require('../models/exam');
let questionBank = require('../models/questionBank');

router.route('/').get((req, res) => {
    user.find()
        .then(questionBank =>res.json(questionBank))
        .catch(err => res.status(400).json('error: ' + err));
    });

router.route ('/create').post(async(req,res) => {
    const {ID,CourseID, Title,EasyQuestions,MediumQuestions,HardQuestions} = req.body;
    const questionBankCreated = await questionBank.create({ID,CourseID, Title,EasyQuestions,MediumQuestions,HardQuestions});
    res.send(questionBankCreated);
});


router.route("/return").post(async(req, res) => {
    const {ID,ExamID} = req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,ExamID: ExamID});
    res.json(questionBankExists);
  
  });
  router.route("/update").post(async(req, res) => {
    const {ID,ExamID,Title}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,ExamID:ExamID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{questionBank.Title=Title;

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/deleteQuestion").post(async(req, res) => {
    const {CourseID,Question,QID,Level}=req.body;
    const questionBankExists = await questionBank.findOne({CourseID:CourseID,ID:QID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
        if(Level=="Easy")
        {
            var list=[];
            for(var i=0;i<questionBank.EasyQuestions.length;i++)
            {
                if((questionBank.EasyQuestions[i]).Question!=Question.Question)
                {
                    list.push(questionBank.EasyQuestions[i])
                }
            }
            questionBank.EasyQuestions=list;
        }
        else if(Level=="Medium")
        {
            var list=[];
            for(var i=0;i<questionBank.MediumQuestions.length;i++)
            {
                if((questionBank.MediumQuestions[i]).Question!=Question.Question)
                {
                    list.push(questionBank.MediumQuestions[i])
                }
            }
            questionBank.MediumQuestions=list;
        }
        else
        {
            var list=[];
            for(var i=0;i<questionBank.HardQuestions.length;i++)
            {
                if((questionBank.HardQuestions[i]).Question!=Question.Question)
                {
                    list.push(questionBank.HardQuestions[i])
                }
            }
            questionBank.HardQuestions=list;
        }
     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/update2").post(async(req, res) => {
    const {ID,ExamID,Questions,QuestionsGrade,QuestionsType,QuestionsLevel}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,ExamID:ExamID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
        questionBank.Questions.push(Questions);
        questionBank.QuestionsGrade.push(QuestionsGrade);
        questionBank.QuestionsType.push(QuestionsType);
        questionBank.QuestionsLevel.push(QuestionsLevel);
     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/SearchResult").post(async(req, res) => {
    const {CourseID}=req.body;
    let result2=await questionBank.find({CourseID:CourseID});
    res.json(result2);
  
  });
  router.route("/SearchResult1").post(async(req, res) => {
    const {CourseID,ID}=req.body;
    let result2=await questionBank.find({ID:ID,CourseID:CourseID});
    res.json(result2);
  
  });
  router.route("/SearchResult2").post(async(req, res) => {
    const {ExamID,ID}=req.body;
    let result2=await questionBank.find({ExamID:ExamID,ID:ID});
    res.json(result2);
  
  });


  router.route("/updateEasy").post(async(req, res) => {
    const {ID,CourseID,EasyQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{questionBank.EasyQuestions.push(EasyQuestions);

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editEasy").post(async(req, res) => {
    const {ID,CourseID,index,EasyQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
        if(EasyQuestions.Question==null)
            EasyQuestions.Question=questionBank.EasyQuestions[index].Question
        if(EasyQuestions.QAnswer==null)
            EasyQuestions.QAnswer=questionBank.EasyQuestions[index].QAnswer
        if(EasyQuestions.CSolution==null)
            EasyQuestions.CSolution=questionBank.EasyQuestions[index].CSolution
        if(EasyQuestions.WSolution1==null)
            EasyQuestions.WSolution1=questionBank.EasyQuestions[index].WSolution1   
        if(EasyQuestions.WSolution2==null)
            EasyQuestions.WSolution2=questionBank.EasyQuestions[index].WSolution2 
        if(EasyQuestions.WSolution3==null)
            EasyQuestions.WSolution3=questionBank.EasyQuestions[index].WSolution3 
        if(EasyQuestions.image==null)
            EasyQuestions.image=questionBank.EasyQuestions[index].image
        if(EasyQuestions.fimage==null)
            EasyQuestions.fimage=questionBank.EasyQuestions[index].fimage
        if(EasyQuestions.simage==null)
            EasyQuestions.simage=questionBank.EasyQuestions[index].simage
        if(EasyQuestions.timage==null)
            EasyQuestions.timage=questionBank.EasyQuestions[index].timage
        if(EasyQuestions.foimage==null)
            EasyQuestions.foimage=questionBank.EasyQuestions[index].foimage

        questionBank.EasyQuestions[index]=EasyQuestions

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editEasys").post(async(req, res) => {
    const {ID,CourseID,index,EasyQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
        if(EasyQuestions.Question==null)
            EasyQuestions.Question=questionBank.EasyQuestions[index].Question
        if(EasyQuestions.image==null)
            EasyQuestions.image=questionBank.EasyQuestions[index].image

        questionBank.EasyQuestions[index]=EasyQuestions

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editEasys1").post(async(req, res) => {
    const {ID,CourseID,index,EasyQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
        if(EasyQuestions.Question==null)
            EasyQuestions.Question=questionBank.EasyQuestions[index].Question
        if(EasyQuestions.QAnswer==null)
            EasyQuestions.QAnswer=questionBank.EasyQuestions[index].QAnswer
        if(EasyQuestions.image==null)
            EasyQuestions.image=questionBank.EasyQuestions[index].image

        questionBank.EasyQuestions[index]=EasyQuestions

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/updateMedium").post(async(req, res) => {
    const {ID,CourseID,MediumQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{questionBank.MediumQuestions.push(MediumQuestions);

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editMedium").post(async(req, res) => {
    const {ID,CourseID,index,MediumQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
    if(MediumQuestions.Question==null)
        MediumQuestions.Question=questionBank.MediumQuestions[index].Question
    if(MediumQuestions.CSolution==null)
        MediumQuestions.CSolution=questionBank.MediumQuestions[index].CSolution
    if(MediumQuestions.WSolution1==null)
        MediumQuestions.WSolution1=questionBank.MediumQuestions[index].WSolution1   
    if(MediumQuestions.WSolution2==null)
        MediumQuestions.WSolution2=questionBank.MediumQuestions[index].WSolution2 
    if(MediumQuestions.WSolution3==null)
        MediumQuestions.WSolution3=questionBank.MediumQuestions[index].WSolution3 
    if(MediumQuestions.image==null)
        MediumQuestions.image=questionBank.MediumQuestions[index].image
    if(MediumQuestions.fimage==null)
        MediumQuestions.fimage=questionBank.MediumQuestions[index].fimage
    if(MediumQuestions.simage==null)
        MediumQuestions.simage=questionBank.MediumQuestions[index].simage
    if(MediumQuestions.timage==null)
        MediumQuestions.timage=questionBank.MediumQuestions[index].timage
    if(MediumQuestions.foimage==null)
        MediumQuestions.foimage=questionBank.MediumQuestions[index].foimage

    questionBank.MediumQuestions[index]=MediumQuestions 

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editMediums").post(async(req, res) => {
    const {ID,CourseID,index,MediumQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
    if(MediumQuestions.Question==null)
        MediumQuestions.Question=questionBank.MediumQuestions[index].Question
    if(MediumQuestions.image==null)
        MediumQuestions.image=questionBank.MediumQuestions[index].image

    questionBank.MediumQuestions[index]=MediumQuestions 

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editMediums1").post(async(req, res) => {
    const {ID,CourseID,index,MediumQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
    if(MediumQuestions.Question==null)
        MediumQuestions.Question=questionBank.MediumQuestions[index].Question
    if(MediumQuestions.QAnswer==null)
        MediumQuestions.QAnswer=questionBank.MediumQuestions[index].QAnswer
    if(MediumQuestions.image==null)
        MediumQuestions.image=questionBank.MediumQuestions[index].image

    questionBank.MediumQuestions[index]=MediumQuestions 

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/updateHard").post(async(req, res) => {
    const {ID,CourseID,HardQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{questionBank.HardQuestions.push(HardQuestions);

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editHard").post(async(req, res) => {
    const {ID,CourseID,index,HardQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
    if(HardQuestions.Question==null)
        HardQuestions.Question=questionBank.HardQuestions[index].Question
    if(HardQuestions.CSolution==null)
        HardQuestions.CSolution=questionBank.HardQuestions[index].CSolution
    if(HardQuestions.WSolution1==null)
        HardQuestions.WSolution1=questionBank.HardQuestions[index].WSolution1   
    if(HardQuestions.WSolution2==null)
        HardQuestions.WSolution2=questionBank.HardQuestions[index].WSolution2 
    if(HardQuestions.WSolution3==null)
        HardQuestions.WSolution3=questionBank.HardQuestions[index].WSolution3 
    if(HardQuestions.image==null)
        HardQuestions.image=questionBank.HardQuestions[index].image
    if(HardQuestions.fimage==null)
        HardQuestions.fimage=questionBank.HardQuestions[index].fimage
    if(HardQuestions.simage==null)
        HardQuestions.simage=questionBank.HardQuestions[index].simage
    if(HardQuestions.timage==null)
        HardQuestions.timage=questionBank.HardQuestions[index].timage
    if(HardQuestions.foimage==null)
        HardQuestions.foimage=questionBank.HardQuestions[index].foimage

    questionBank.HardQuestions[index]=HardQuestions 

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editHards").post(async(req, res) => {
    const {ID,CourseID,index,HardQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
    if(HardQuestions.Question==null)
        HardQuestions.Question=questionBank.HardQuestions[index].Question
    if(HardQuestions.image==null)
        HardQuestions.image=questionBank.HardQuestions[index].image

    questionBank.HardQuestions[index]=HardQuestions 

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
router.route("/editHards1").post(async(req, res) => {
    const {ID,CourseID,index,HardQuestions}=req.body;
    const questionBankExists = await questionBank.findOne ({ID: ID,CourseID:CourseID});
    questionBank.findByIdAndUpdate(questionBankExists._id)
    .then(questionBank =>{
    if(HardQuestions.Question==null)
        HardQuestions.Question=questionBank.HardQuestions[index].Question
    if(HardQuestions.QAnswer==null)
        HardQuestions.QAnswer=questionBank.HardQuestions[index].QAnswer
    if(HardQuestions.image==null)
        HardQuestions.image=questionBank.HardQuestions[index].image

    questionBank.HardQuestions[index]=HardQuestions 

     questionBank.save()

        .then(questionBank =>res.json('QuestionBank Updated'))
        .catch(err =>{ console.log(err); });
    })
    .catch(err =>{
        console.log(err);
    });
});
module.exports = router ; 
