import { Schema, model } from "mongoose";

// Defining Schema
const AuthorSchema = new Schema({
    author: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            trim: true
        },
    },
    books: []
})

//Compiling Schema
const AuthorModel = model('authors', AuthorSchema)

export default AuthorModel