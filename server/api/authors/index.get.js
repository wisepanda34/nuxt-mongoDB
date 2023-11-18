import AuthorModel from "~/server/models/Author.js";

export default defineEventHandler( async () => {
    try {
        const result = await AuthorModel.find()
        console.log("result>", result)
        return result
    }catch (error) {
        console.log(error)
    }
})