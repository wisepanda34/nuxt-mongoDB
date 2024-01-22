// server/api/books.get.js

import AuthorModel from "~/server/models/Author.js";

export default defineEventHandler( async (event) => {

  try {
    const response = await AuthorModel.find()
    console.log('authors.get.js: ok');
    if(response){
      return response
    }
  }catch (error) {
    console.log(error)
  }
})