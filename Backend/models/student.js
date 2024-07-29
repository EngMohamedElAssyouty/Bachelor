const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
}, 
{ timestamps: true });
const student = mongoose.model('Student',studentSchema);
module.exports = student;