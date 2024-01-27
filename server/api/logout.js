// server/api/logout.js

import tokenService from "~/server/service/token-service.js";

export default defineEventHandler(async(event)=> {
  try{
    let refreshToken = getCookie(event, 'refreshToken')
    let easyToken = getCookie(event, 'easyToken')
    
    const removeToken = await tokenService.removeToken(easyToken)
    setCookie(event, 'refreshToken', '',{
      maxAge: -1,
      httpOnly: true,
    })
    setCookie(event, 'easyToken', '',{
      maxAge: -1,
    })
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