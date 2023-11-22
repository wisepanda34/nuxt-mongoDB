import movieModel from "~/server/models/Movies.js"

export default defineEventHandler( async ()=>{
    try{
        const result = await movieModel.findOne({"title": "Awful cinema"})
        console.log(result)
        return result
    }catch (error) {
        console.log(error)
    }
})