import mongoose from "mongoose";

// Defining Schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true},
    body: { type: String, required: true, trim: true}
})


//Compiling Schema
const PostModel = mongoose.model('bloges', postSchema)

export default PostModel