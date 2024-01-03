//  server/service/user-service.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import MailService from "../service/mail-service.js";
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";
import {email} from "@vuelidate/validators";

const registration = async(email, password) => {
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw new Error(`User with email ${email} already exists`)
  }
  const hashPassword = await bcrypt.hash(password, 3)

  //уникальный идентификатор для активации учетной записи пользователя через его имэйл
  const activateLink = v4() //af914236-e488-47fb-925e-c3fb6c762f0b

  //сохраняем пользователя в БД
  const user = await UserModel({ email, password: hashPassword, activateLink});

  //отправка ссылки активации на имейл пользователя
  await MailService.sendActivationMail(email, activateLink)

  //dto используем, чтобы не светить пароль
  const userDto = createUserDto(user); // id, email, isActivated

  //генерируем токены
  const tokens = tokenService.generateTokens({...userDto}, activateLink)

  //сохраняем refreshToken в БД
  await tokenService.saveToken(userDto.id, tokens.refreshToken)
  return {...tokens, user: userDto}
}