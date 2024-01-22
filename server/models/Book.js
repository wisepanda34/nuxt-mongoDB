// server/models/Books.js
import { Schema, model } from 'mongoose'

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    year: Number
})

const bookModel = model('books', BookSchema)

export default bookModel