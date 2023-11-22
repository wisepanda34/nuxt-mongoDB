import PostModel from "~/server/models/Post.js";

export default defineEventHandler( async () => {
    try {
        return await PostModel.find()
    }catch (error) {
        console.log(error)
    }
})