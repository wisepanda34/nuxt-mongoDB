import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: String,
    "cinema studio": String
})

const movieModel = mongoose.model('movies', movieSchema)

export default movieModel