import mongoose from "mongoose";

// Defining Schema
const birthdaySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    surname: { type: String, trim: true},
    info: { type: String, trim: true },
    birthday: { type: Date }
})


//Compiling Schema
const birthdayModel = mongoose.model('birthdays', birthdaySchema)

export default birthdayModel