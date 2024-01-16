// server/api/login.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";
import cookieParser from "cookie-parser";

export default defineEventHandler(async(event)=> {
  try{
    const { email, password } = await readBody(event);
    const findUser = await UserModel.findOne({email});
    if (!findUser) {
      return {
        status: 400,
        body: { message: 'user entered incorrectly ((' },
      };
    }
    // Сравнение введенного пароля с хешем из базы данных
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return {
        status: 400,
        body: { message: 'Password entered incorrectly ((' },
      };
    }
    const userDto = createUserDto(findUser)// id, email, isActivated
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    // устанавливаем куку refreshToken в ответе
    const cookieOptions = {
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 дней
      httpOnly: true,
    };
    // создает подпись для значения куки с использованием заданного секретного ключа
    const refreshTokenCookie = cookieParser.signedCookie('refreshToken', tokens.refreshToken, process.env.JWT_REFRESH_SECRET);
    const refreshToken = `refreshToken=${refreshTokenCookie}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
    setCookie(event, 'refreshToken', refreshToken)
    setCookie(event, 'easyToken', tokens.refreshToken)

   
    return {
      status: 200,
      body: {
        user: {
          id: findUser._id,
          email: findUser.email,
          role: findUser.role
        },
        message: 'You have logged in successfully',
        accessToken: tokens.accessToken
      },
    };
  } catch (error) {
    console.error('Error login.js:', error.message);
    console.error('Stack Trace:', error.stack);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
})