// server/api/refresh.js

import tokenService from "~/server/service/token-service.js";
import createUserDto from "~/server/dtos/user-dto.js";
import UserModel from "~/server/models/Users.js";
import cookieParser from "cookie-parser";

export default defineEventHandler(async(event)=> {
  try{
    let refreshToken = getCookie(event, 'easyToken')
    if(!refreshToken) {
      return {
        status: 400,
        body:{ message: "Problem with refreshToken" }
      }
    }
    const userData = await tokenService.validateRefreshToken(refreshToken)
    console.log('/refresh userData: ', userData);
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

    // устанавливаем куку refreshToken в ответе
    const cookieOptions = {
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 дней
      httpOnly: true,
    };
    // создает подпись для значения куки с использованием заданного секретного ключа
    const refreshTokenCookie = cookieParser.signedCookie('refreshToken', tokens.refreshToken, process.env.JWT_REFRESH_SECRET);
    const newRefreshToken = `refreshToken=${refreshTokenCookie}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
    setCookie(event, 'refreshToken', newRefreshToken)
    setCookie(event, 'easyToken', tokens.refreshToken)

    return {
      status: 200,
      body: { message: 'refreshToken is refreshed!', accessToken: tokens.accessToken},
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