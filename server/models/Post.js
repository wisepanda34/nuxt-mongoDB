import { Schema, model } from "mongoose";

// Defining Schema
const PostSchema = new Schema({
    title: { type: String, required: true, trim: true},
    body: { type: String, required: true, trim: true}
})


//Compiling Schema
const PostModel = model('bloges', PostSchema)

export default PostModel