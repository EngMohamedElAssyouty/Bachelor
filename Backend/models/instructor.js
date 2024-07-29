const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  Password: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  ListOfCourses: {
    type: [],
    required: true,
  },
  ListOfExams: {
    type: [],
    required: true,
  },
}, 
{ timestamps: true });
const instructor = mongoose.model('Instructor',instructorSchema);
module.exports = instructor;