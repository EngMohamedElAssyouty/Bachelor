import express from "express";
import cors from "cors";
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true})
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
app.use(cors());
app.use(express.json());





const port=process.env.PORT || 8000;


const studentRouter = require('./routes/students');
const instructorRouter = require('./routes/instructors');
const courseRouter = require('./routes/courses');
const examRouter = require('./routes/exams');
const questionBankRouter = require('./routes/questionBanks');
const pastExamRouter = require('./routes/pastExams');

app.use('/students',studentRouter);
app.use('/instructors',instructorRouter);
app.use('/courses',courseRouter);
app.use('/exams',examRouter);
app.use('/questionBanks',questionBankRouter);
app.use('/pastExams',pastExamRouter);


app.listen(port, () =>console.log(`Server is running on port ${port}`));