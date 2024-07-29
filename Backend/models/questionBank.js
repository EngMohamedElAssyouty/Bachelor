const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionBankSchema = new Schema({
  ID: {
    type: Number,
    required: true,
  },
  CourseID: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: false,
  },
  EasyQuestions: {
    type: [],
    required: true,
  },
  MediumQuestions: {
    type: [],
    required: true,
  },
  HardQuestions: {
    type: [],
    required: true,
  },
}, 
{ timestamps: true });
const questionBank = mongoose.model('QuestionBank',questionBankSchema);
module.exports = questionBank;