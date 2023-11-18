import mongoose from "mongoose";

// Defining Schema
const authorSchema = new mongoose.Schema({
    author: {
        name: {type: String, required: true, trim: true},
        surname: {type: String, required: true, trim: true},
    },
    books: []
})

//Compiling Schema
const AuthorModel = mongoose.model('authors', authorSchema)

export default AuthorModel