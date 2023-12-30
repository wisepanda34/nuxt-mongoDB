// server/api/registration.js
import UserModel from "../models/Users.js";
import mailService from "../service/mail-service.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";

export default defineEventHandler(async (event) => {
  try{
    const { email, password } = await readBody(event);
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return {
        status: 400,
        body: { error: 'User with this email already exists' },
      };
    }
    const hashPassword = await bcrypt.hash(password, 3)

    //уникальный идентификатор для активации учетной записи пользователя через его имэйл
    const activateLink = v4() //af914236-e488-47fb-925e-c3fb6c762f0b

    //сохраняем пользователя в БД
    const newUser = await UserModel({ email, password: hashPassword, activateLink});

    //отправка ссылки активации на имейл пользователя
    // await mailService.sendActivationMail(email, activateLink)

    // const userDto = createUserDto(newUser); // id, email, isActivated

    //генерируем токены
    // const tokens = tokenService.generateTokens({...userDto}, activateLink)

    //сохраняем refreshToken в БД
    // await tokenService.saveToken(userDto.id, tokens.refreshToken)
    await newUser.save();
    // return {...tokens, user: userDto}

    return {
      status: 200,
      body: { message: 'Registration received successfully' },
    };

  }catch (error){
    console.error('Error:', error.message);
    console.log('Error:', error.message);
    console.error('Stack Trace:', error.stack);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
});