import movieModel from "~/server/models/Movies.js"

export default defineEventHandler( async ()=>{
  try{
    return  await movieModel.findOne({"title": "Awful cinema"})
  }catch (error) {
    console.log(error)
  }
})