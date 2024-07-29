const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pastExamSchema = new Schema({
  CourseID: {
    type: String,
    required: true,
  },
  ExamID: {
    type: String,
    required: true,
  },
  ExamName: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Grade: {
    type: Number,
    required: true,
  },
  StudentEmail: {
    type: String,
    required: true,
  },
  StudentGrade: {
    type: Number,
    required: true,
  },
  AllAnswers: {
    type:[],
    required: true,
  },
  StudentImage: {
    type:[],
    required: true,
  },
}, 
{ timestamps: true });
const pastExam = mongoose.model('PastExam',pastExamSchema);
module.exports = pastExam;