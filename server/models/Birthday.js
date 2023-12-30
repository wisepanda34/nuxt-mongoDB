import { Schema, model } from "mongoose";
// Defining Schema
const BirthdaySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    type: String
  }
})
//Compiling Schema
const BirthdayModel = model('birthdays', BirthdaySchema)
export default BirthdayModel