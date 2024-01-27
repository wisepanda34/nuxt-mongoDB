// server/api/books.get.js

import AuthorModel from "~/server/models/Author.js";
import TokenService from "../service/token-service";


export default defineEventHandler( async (event) => {
  console.log('authors.get.js started');
  
  try {
    const accessToken = getRequestHeader(event, 'Authorization');
    if(accessToken){
      console.log('accessToken from client:', accessToken) ;
      
      const isAccessTokenValidated = TokenService.validateAccessToken(accessToken);

      if (!isAccessTokenValidated) {
        console.log('401');
        setResponseStatus(event, 401);
        return {
          message: 'accessToken is not valid'
        }
      }
    }
    const response = await AuthorModel.find()
    console.log('authors.get.js: ok');
    if(response) {
      return response
    } else {
      return{
        body: {message: "no data from DB"}
      }
    }
  }catch (error) {
    console.log(error)
  }
})