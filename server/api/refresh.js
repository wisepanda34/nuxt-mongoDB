// server/api/refresh.js

import tokenService from "~/server/service/token-service.js";
import createUserDto from "~/server/dtos/user-dto.js";
import UserModel from "~/server/models/Users.js";

export default defineEventHandler(async(event)=> {
  try{
    const { refreshToken } = await readBody(event)
    if(!refreshToken) {
      return {
        status: 400,
        body:{ message: "Problem with refreshToken" }
      }
    }
    const userData = await tokenService.validateRefreshToken(refreshToken)
    console.log('/refresh userData: ', userData);
    // res.cookie('refreshToken', userData.refreshToken, {maxAge})
    const tokenFromDB = await tokenService.findToken(refreshToken)
    if(!userData || !tokenFromDB) {
     return {
       status: 400,
       body:{ message: "User is not authorizated!"}
     }
    }
    const findUser = await UserModel.findById(userData.id) 
    const userDto = createUserDto(findUser)
    const tokens = tokenService.generateTokens({...userDto})
    //перезаписываем свежий refreshToken в БД
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      status: 200,
      body: { message: 'refreshToken is refreshed!', tokens },
    };
  }catch (error) {
    console.error('Error registration.js:', error.message);
    console.error('Stack Trace:', error.stack);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
})