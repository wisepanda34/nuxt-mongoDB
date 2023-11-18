import PostModel from "~/server/models/Post.js";

export default defineEventHandler( async () => {
    try {
        const result = await PostModel.find()
        console.log("result>", result)
        return result
    }catch (error) {
        console.log(error)
    }
})