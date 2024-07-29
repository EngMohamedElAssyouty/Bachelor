const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  ID: {
    type: String,
    required: true,
  },
  CourseName: {
    type: String,
    required: true,
  },
  CreditHours: {
    type: Number,
    required: true,
  },
  Instructors: {
    type: [], 
    req:"instructor",
  },
  Students: {
    type: [], 
    ref:"student",
  },
  QuestionBanks: {
    type: Number,
    required: true,
  },
}, 
{ timestamps: true });
const course = mongoose.model('Course',courseSchema);
module.exports = course;