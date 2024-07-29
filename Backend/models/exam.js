const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
  CourseID: {
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
  StartTime: {
    type: Date,
    required: true,
  },
  EndTime: {
    type: Date,
    required: true,
  },
  Duration: {
    type: Number,
    required: true,
  },
  listofQuestions: {
    type:[],
    required: true,
  },
  AllQuestions: {
    type:[],
    required: true,
  },
}, 
{ timestamps: true });
const exam = mongoose.model('Exam',examSchema);
module.exports = exam;