// server/api/logout.js

import tokenService from "~/server/service/token-service.js";
import cookieParser from "cookie-parser";

export default defineEventHandler(async(event)=> {
  try{
    // console.log('event.node.req.cookies:',event.node.req.cookies);
    // const refreshToken = event.node.req.cookies.get('refreshToken') //достаем из куки рефрештокен
    // console.log('refreshToken:',refreshToken);
    // event.node.res.clearCookie('refreshToken') //удаление рефрештокена из куки
    // const tokenData = await tokenService.removeToken(refreshToken)
    // console.log("tokenData:", tokenData);  
    return {
      status: 200,
      body: { message: 'User is out!' },
    };
  }catch (error) {
    console.error('Error login.js:', error.message);
    console.error('Stack Trace:', error.stack);

    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
});