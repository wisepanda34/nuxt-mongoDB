// server/api/registration.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import MailService from "../service/mail-service.js";
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";
// import cookieParser from "cookie-parser";
// import {body} from 'express-validator'


export default defineEventHandler(async (event) => {
  try{
    const { email, password } = await readBody(event);
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return {
        status: 400,
        body: { error: `User with email ${email} already exists` },
      };
    }
    const hashPassword = await bcrypt.hash(password, 3)

    //уникальный идентификатор для активации учетной записи пользователя через его имэйл
    const activationLink = v4() //af914236-e488-47fb-925e-c3fb6c762f0b

    //сохраняем пользователя в БД
    const newUser = await UserModel({ email, password: hashPassword, role: 'user', activationLink});
    console.log("newUser:",newUser)
    //отправка ссылки активации на имейл пользователя
    // console.log('MailService')
    // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    // await MailService.sendActivationMail(email, activationLink)

    //dto используем, чтобы не светить пароль
    const userDto = createUserDto(newUser); // id, email, isActivated
    console.log("userDto: ", userDto);
    //генерируем токены
    const tokens = tokenService.generateTokens({...userDto}, activationLink)
    console.log("tokens: ", tokens);

    await newUser.save();
    console.log("save newUser");
    //сохраняем refreshToken в БД
    await tokenService.saveToken(userDto.id, tokens.refreshToken)


    // устанавливаем куку refreshToken в ответе
    // const cookieOptions = {
    //   maxAge: 60 * 24 * 60 * 60 * 1000, // 60 дней
    //   httpOnly: true,
    // };
    // создает подпись для значения куки с использованием заданного секретного ключа
    // const refreshTokenCookie = cookieParser.signedCookie('refreshToken', tokens.refreshToken, process.env.JWT_REFRESH_SECRET);
    // console.log('refreshTokenCookie: ',refreshTokenCookie)
    // event.headers['Set-Cookie'] = `refreshToken=${refreshTokenCookie}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
    // event.headers['Set-Cookie'] = `refreshToken=${tokens.accessToken}; accessToken=${tokens.refreshToken}`;

    return {
      status: 200,
      // headers: event.headers,
      body: { message: 'Registration received successfully', tokens },
    };

  }catch (error){
    console.error('Error registration.js:', error.message);
    console.error('Stack Trace:', error.stack);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
});