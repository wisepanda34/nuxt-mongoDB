// server/api/registration.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import MailService from "../service/mail-service.js";
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";
// import cookieParser from "cookie-parser";
import {body} from 'express-validator'


export default defineEventHandler(async (event) => {
  try{
    const { email, password } = await readBody(event);
    console.log(email, password);
    
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
    const newUser = await UserModel({ email, password: hashPassword, role: 'user'});
    console.log("newUser:",newUser)
    //отправка ссылки активации на имейл пользователя
    // console.log('MailService')
    const path = `${process.env.API_URL}/api/activate/${activationLink}`
    // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    // await MailService.sendActivationMail(email, activationLink)

    //dto используем, чтобы не светить пароль
    const userDto = createUserDto(newUser); // id, email, isActivated
    console.log("userDto: ", userDto);
    //генерируем токены
    // const tokens = tokenService.generateTokens({...userDto})
    // console.log("tokens: ", tokens);

    await newUser.save();
    // console.log("save newUser");
    //сохраняем refreshToken в БД
    // await tokenService.saveToken(userDto.id, tokens.refreshToken)


    return {
      status: 200,
      body: { message: 'Registration received successfully'},
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