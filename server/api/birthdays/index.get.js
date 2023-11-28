import birthdayModel from "~/server/models/Birthday.js"

export default defineEventHandler( async ()=>{
    try{
        const response = await birthdayModel.find()
        console.log(response)
        return { birthdays: response }
    }catch (error) {
        console.log(error)
    }
})