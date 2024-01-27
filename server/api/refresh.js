// server/api/refresh.js

import tokenService from "~/server/service/token-service.js";
import createUserDto from "~/server/dtos/user-dto.js";
import UserModel from "~/server/models/Users.js";
import cookieParser from "cookie-parser";

export default defineEventHandler(async(event)=> {
  try{
    console.log('refresh.js start');
    
    let refreshToken = getCookie(event, 'easyToken')

    // если refreshToken отсутствует в куках
    if(!refreshToken) {
      console.log('No refreshToken');
      setResponseStatus(event, 401);
      return { body:{ message: "No refreshToken, user needs to log in!"}}
    }

    // если refreshToken невалидный
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)
    if(!userData || !tokenFromDB) {
      console.log('!userData || !tokenFromDB');
      setResponseStatus(event, 401);
      return { status: 401, body:{ message: "User is not authorizated!"}}

    } else {
       // если refreshToken валидный - генерируем свежий accessToken
      const findUser = await UserModel.findById(userData.id) 
      const userDto = createUserDto(findUser)
      const tokens = tokenService.generateTokens({...userDto})
      console.log('accessToken was refreshed:', tokens.accessToken);
      
      return {
        status: 200,
        body: { message: 'accessToken was refreshed!', accessToken: tokens.accessToken},
      };
    }
   
  }catch (error) {
    console.error('Error registration.js:', error.message);
    console.error('Stack Trace:', error.stack);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
})