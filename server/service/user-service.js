//  server/service/user-service.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import MailService from "../service/mail-service.js";
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";
import {body, validationResult } from 'express-validator'

const registrationValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
];

const registration = async(email, password) => {
  // Проверка валидации
  console.log('Validation')
  registrationValidation.forEach(validation => validation(req, res, next));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('errors: ', errors)
    return res.status(400).json({ errors: errors.array() });
  }
 try{
   const { email, password } = req.body;
   console.log('email:', email)
   console.log('password:', password)
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
   // await MailService.sendActivationMail(email, activateLink)

   //dto используем, чтобы не светить пароль
   const userDto = createUserDto(user); // id, email, isActivated

   //генерируем токены
   const tokens = tokenService.generateTokens({...userDto}, activateLink)

   //сохраняем refreshToken в БД
   await tokenService.saveToken(userDto.id, tokens.refreshToken)
   return {...tokens, user: userDto}
 }catch (error) {
   next(error)
 }
}