import birthdayModel from "~/server/models/Birthday.js"

export default defineEventHandler( async ()=>{
    try{
        const result = await birthdayModel.find()
        console.log(result)
        return result
    }catch (error) {
        console.log(error)
    }
})