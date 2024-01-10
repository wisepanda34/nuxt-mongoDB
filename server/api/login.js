// server/api/login.js
import UserModel from "../models/Users.js";
import bcrypt from 'bcrypt';
import tokenService from "../service/token-service.js";
import createUserDto  from "../dtos/user-dto.js";

export default defineEventHandler(async(event)=> {
  try{
    const { email, password } = await readBody(event);
    // console.log('hashPassword: ', hashPassword)
    const findUser = await UserModel.findOne({email});
    if (!findUser) {
      return {
        status: 400,
        body: { message: 'user entered incorrectly ((' },
      };
    }
    // const hashPassword = await bcrypt.hash(password, 3)
    // Сравнение введенного пароля с хешем из базы данных
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return {
        status: 400,
        body: { message: `Password entered incorrectly (( ` },
      };
    }
    const userDto = createUserDto(findUser)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      status: 200,
      body: {
        id: findUser._id,
        email: findUser.email,
        role: findUser.role,
        message: `You have logged in successfully`,
        tokens: tokens
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