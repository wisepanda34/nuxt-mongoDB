import birthdayModel from "~/server/models/Birthday.js"

export default defineEventHandler( async ()=>{
    try{
        return await birthdayModel.find()
    }catch (error) {
        console.log(error)
    }
})