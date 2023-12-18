import mongoose from "mongoose";
// Defining Schema
const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    trim: true
  },
  info: {
    type: String,
    trim: true
  },
  birthday: {
    day: Number,
    indexMonth: Number,
    year: Number,
  },
  beforehand: {
    type: String || Number
  }
})
//Compiling Schema
const BirthdayModel = mongoose.model('birthdays', birthdaySchema)
export default BirthdayModel