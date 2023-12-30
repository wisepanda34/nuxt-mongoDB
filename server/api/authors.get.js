import AuthorModel from "~/server/models/Author.js";

export default defineEventHandler( async () => {
  try {
    return await AuthorModel.find()
  }catch (error) {
    console.log(error)
  }
})