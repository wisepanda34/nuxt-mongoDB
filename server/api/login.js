// server/api/login.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";

export default defineEventHandler(async(event)=> {
  try{
    const { email, password } = await readBody(event);
    const hashPassword = await bcrypt.hash(password, 3)
    console.log('hashPassword: ', hashPassword)
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
    return {
      status: 200,
      body: { message: 'You have logged in successfully' },
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