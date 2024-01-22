// server/api/books.get.js

import bookModel from "../models/Book"

export default defineEventHandler(async(event) => {

  try{
    const response = await bookModel.find();
    console.log('books.get.js: ok');
    if(response){
      return response
    }
  } catch(error) {
    console.log('books.get.js error:', error);
  }
})