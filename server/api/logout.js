// server/api/logout.js

import tokenService from "~/server/service/token-service.js";

export default defineEventHandler(async(event)=> {
  try{
    const { refreshToken } = await readBody(event)
    const tokenData = await tokenService.removeToken(refreshToken)
    // res.clearCookie('refreshToken')
    // return  res.json(token)
    return {
      status: 200,
      // headers: event.headers,
      body: { message: 'RefreshToken is destroyed!' },
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