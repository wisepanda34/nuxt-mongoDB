import { Schema, model } from 'mongoose'

const MovieSchema = new Schema({
    title: String,
    "cinema studio": String
})

const movieModel = model('movies', MovieSchema)

export default movieModel